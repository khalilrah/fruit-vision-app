# backend/app/models_loader.py
import torch
import torch.nn as nn
import torchvision.models as tv_models # Renommé pour éviter conflit avec models_ai
import torchvision.transforms as transforms
from PIL import Image
import numpy as np # Non utilisé directement ici, mais CombinedModel pourrait en dépendre implicitement via PyTorch
import os
from ultralytics import YOLO

# --- Configuration des Chemins ---
MODEL_AI_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'models_ai')

YOLO_MODEL_PATH = os.path.join(MODEL_AI_DIR, 'best.pt')
ORANGE_WEIGHT_MODEL_PATH = os.path.join(MODEL_AI_DIR, 'orange_resnet18_best_model.pth')
STRAWBERRY_WEIGHT_MODEL_PATH = os.path.join(MODEL_AI_DIR, 'strawberry_resnet18_best_model.pth') # Nom corrigé (pas straww_)
POTATO_WEIGHT_MODEL_PATH = os.path.join(MODEL_AI_DIR, 'potato_resnet18_best_model.pth')

# OUTPUT_DIR n'est pas utilisé dans CE fichier, mais dans processing.py pour la sauvegarde
# OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'output_images_api') # Exemple si besoin
# os.makedirs(OUTPUT_DIR, exist_ok=True)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"[ModelsLoader] Using device: {device}")

# --- Définition du Modèle Combiné ---
class CombinedModel(nn.Module):
    def __init__(self, backbone_type='resnet18'): # Default à resnet18 si c'est le plus commun
        super(CombinedModel, self).__init__()
        self.backbone_type = backbone_type

        if backbone_type == 'mobilenet_v2':
            weights = tv_models.MobileNet_V2_Weights.DEFAULT
            backbone = tv_models.mobilenet_v2(weights=weights)
            self.backbone_output_size = backbone.last_channel
            backbone.classifier = nn.Identity()
        elif backbone_type == 'resnet18':
            weights = tv_models.ResNet18_Weights.DEFAULT
            backbone = tv_models.resnet18(weights=weights)
            self.backbone_output_size = backbone.fc.in_features
            backbone.fc = nn.Identity()
        elif backbone_type == 'efficientnet_b0':
            weights = tv_models.EfficientNet_B0_Weights.DEFAULT
            backbone = tv_models.efficientnet_b0(weights=weights)
            try: self.backbone_output_size = backbone.classifier[1].in_features
            except TypeError: self.backbone_output_size = backbone.classifier[0].in_features
            backbone.classifier = nn.Identity()
        else:
            raise ValueError(f"Unsupported backbone type: {backbone_type}")
        self.backbone = backbone

        self.numeric_fc = nn.Sequential(
            nn.Linear(3, 64), nn.BatchNorm1d(64), nn.ReLU(), nn.Dropout(0.3),
            nn.Linear(64, 32), nn.BatchNorm1d(32), nn.ReLU(), nn.Dropout(0.3)
        )
        self.regression_head = nn.Sequential(
             nn.Linear(self.backbone_output_size + 32, 128), nn.ReLU(), nn.Dropout(0.3),
             nn.Linear(128, 1)
        )
    def forward(self, image, numeric_features):
        visual_features = self.backbone(image); visual_features = visual_features.view(visual_features.size(0), -1)
        numeric_features = self.numeric_fc(numeric_features); combined_features = torch.cat((visual_features, numeric_features), dim=1)
        output = self.regression_head(combined_features); return output

# --- Transformation d'Image Globale (utilisée par processing.py) ---
weight_model_transform_global = transforms.Compose([
    transforms.Resize((224, 224)), transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# --- Fonction de Chargement de TOUS les modèles ---
def load_all_ai_models():
    print("[ModelsLoader] Attempting to load all AI models...")
    local_yolo_model = None
    local_weight_models = {}
    local_yolo_class_names = {}

    try:
        if not os.path.exists(YOLO_MODEL_PATH):
            print(f"[ModelsLoader] FATAL: YOLO model not found at {YOLO_MODEL_PATH}")
            raise FileNotFoundError(f"YOLO model not found at {YOLO_MODEL_PATH}")
        local_yolo_model = YOLO(YOLO_MODEL_PATH)
        local_yolo_class_names = local_yolo_model.names
        print(f"[ModelsLoader] YOLO model loaded. Classes: {local_yolo_class_names}")
    except Exception as e:
        print(f"[ModelsLoader] FATAL ERROR loading YOLO model: {e}")
        raise # Propage l'erreur pour que le startup de FastAPI échoue proprement

    MODEL_CONFIG = {
        'orange': {'path': ORANGE_WEIGHT_MODEL_PATH, 'backbone': 'resnet18'},
        'strawberry': {'path': STRAWBERRY_WEIGHT_MODEL_PATH, 'backbone': 'resnet18'},
        'potato': {'path': POTATO_WEIGHT_MODEL_PATH, 'backbone': 'resnet18'}
    }

    for fruit_name_key, config in MODEL_CONFIG.items():
        class_id_for_fruit = None
        for class_id, yolo_name in local_yolo_class_names.items():
            if yolo_name.lower() == fruit_name_key.lower():
                class_id_for_fruit = class_id
                break
        
        if class_id_for_fruit is None:
            print(f"[ModelsLoader] WARNING: Class name '{fruit_name_key}' not found in YOLO model names. Skipping weight model loading for it.")
            continue

        model_path = config['path']
        backbone_type = config['backbone']
        print(f"[ModelsLoader] Attempting to load {fruit_name_key.capitalize()} model (ID: {class_id_for_fruit}, Backbone: {backbone_type})...")
        if not os.path.exists(model_path):
            print(f"[ModelsLoader] WARNING: {fruit_name_key.capitalize()} weight model file not found: {model_path}")
            continue # Ne pas ajouter au dictionnaire si le fichier n'existe pas
        try:
            model_instance = CombinedModel(backbone_type=backbone_type)
            model_instance.load_state_dict(torch.load(model_path, map_location=device))
            model_instance.to(device); model_instance.eval()
            local_weight_models[class_id_for_fruit] = model_instance
            print(f"[ModelsLoader] {fruit_name_key.capitalize()} weight model loaded successfully.")
        except Exception as e:
            # Si un modèle de poids échoue, on logue mais on continue pour que YOLO puisse au moins charger
            print(f"[ModelsLoader] ERROR loading {fruit_name_key.capitalize()} weight model: {e}")
            # Ne pas ajouter au dictionnaire si le chargement échoue

    print(f"[ModelsLoader] Weight models successfully loaded for Class IDs: {list(local_weight_models.keys())}")
    print("[ModelsLoader] AI models loading process complete.")
    
    # Retourner les modèles et configurations nécessaires
    return local_yolo_model, local_weight_models, local_yolo_class_names, weight_model_transform_global, device