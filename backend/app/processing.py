# backend/app/processing.py
from PIL import Image
import numpy as np
# import cv2 # Inclus si vous faites du dessin ici, sinon pas indispensable pour la logique de prédiction pure
import torch

# <<< NE PLUS IMPORTER LES VARIABLES GLOBALES DES MODÈLES DIRECTEMENT >>>
# from .models_loader import (
#     yolo_model_global,
#     weight_models_global,
#     yolo_class_names_global,
#     weight_model_transform_global,
#     device
# )

# <<< LA FONCTION PREND MAINTENANT LES MODÈLES ET CONFIGS EN ARGUMENTS >>>
def process_image_for_predictions(
    pil_image: Image.Image,
    yolo_model: any, # Type YOLO model
    weight_models: dict,
    yolo_names_map: dict,
    transform: any, # torchvision.transforms.Compose object
    device_to_use: torch.device, # Le device à utiliser
    confidence_threshold=0.4
):
    """
    Traite une image PIL uploadée en utilisant les modèles fournis.
    Retourne une liste de résultats de détection.
    """
    if yolo_model is None or not yolo_names_map:
        print("[Processing] ERROR: YOLO model ou yolo_names_map non fourni. Impossible de traiter l'image.")
        # Il vaut mieux lever une exception ici, qui sera attrapée par le handler de FastAPI
        raise ValueError("YOLO model or class names not provided to processing function.")

    detection_results = []

    try:
        yolo_raw_results = yolo_model(pil_image, verbose=False)
        if not yolo_raw_results or not hasattr(yolo_raw_results[0], 'boxes'):
            print("[Processing] YOLO n'a pas retourné la structure de résultats attendue.")
            return []
        detections = yolo_raw_results[0].boxes.data.cpu().numpy()
    except Exception as e:
        print(f"[Processing] Erreur durant l'inférence YOLO : {e}")
        # import traceback; traceback.print_exc()
        return []

    for detection in detections:
        xmin, ymin, xmax, ymax, conf, cls_id_float = detection
        cls_id = int(cls_id_float)
        class_name = yolo_names_map.get(cls_id, f'UnknownID:{cls_id}')
        predicted_weight = None

        if conf >= confidence_threshold:
            if cls_id in weight_models:
                try:
                    bbox_int = [int(xmin), int(ymin), int(xmax), int(ymax)]
                    if bbox_int[0] < bbox_int[2] and bbox_int[1] < bbox_int[3]:
                        cropped_pil = pil_image.crop(bbox_int)
                        # <<< UTILISER LA TRANSFORMATION PASSÉE EN ARGUMENT >>>
                        transformed_image = transform(cropped_pil).unsqueeze(0).to(device_to_use)
                        
                        bbox_width = xmax - xmin
                        bbox_height = ymax - ymin
                        bbox_area = bbox_width * bbox_height
                        # <<< UTILISER LE DEVICE PASSÉ EN ARGUMENT >>>
                        numeric_features = torch.tensor([[bbox_width, bbox_height, bbox_area]], dtype=torch.float32).to(device_to_use)
                        
                        weight_model_instance = weight_models[cls_id]
                        with torch.no_grad():
                            predicted_weight = weight_model_instance(transformed_image, numeric_features).item()
                    else:
                        print(f"[Processing] Bbox invalide pour {class_name}, poids ignoré.")
                except Exception as e:
                    print(f"[Processing] ERREUR lors de l'estimation du poids pour {class_name}: {e}")
            
            detection_results.append({
                "class_id": cls_id,
                "class_name": class_name,
                "confidence": float(conf),
                "bounding_box": {
                    "xmin": int(xmin), "ymin": int(ymin),
                    "xmax": int(xmax), "ymax": int(ymax)
                },
                "estimated_weight_g": round(predicted_weight, 1) if predicted_weight is not None else None
            })
            
    return detection_results