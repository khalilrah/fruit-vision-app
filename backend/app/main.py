# backend/app/main.py
from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import logging

# Importer SEULEMENT la fonction de chargement de models_loader
from .models_loader import load_all_ai_models
# La classe CombinedModel n'a pas besoin d'être importée ici, car les instances sont gérées par models_loader
from .processing import process_image_for_predictions

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Fruit Vision API")

# Initialiser les attributs d'état de l'application
app.state.yolo_model = None
app.state.weight_models = None
app.state.yolo_class_names = None
app.state.weight_transform = None
app.state.device = None
app.state.models_fully_loaded = False # Nouveau flag

origins = [ "http://localhost:3000", "http://localhost:5173" ] # Ajoutez vos origines frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    logger.info("Application FastAPI en cours de démarrage...")
    try:
        # Récupérer les modèles retournés par la fonction
        (yolo_m, w_models, yolo_names, w_transform, dev) = load_all_ai_models()
        
        # Assigner les modèles retournés à app.state
        app.state.yolo_model = yolo_m
        app.state.weight_models = w_models
        app.state.yolo_class_names = yolo_names
        app.state.weight_transform = w_transform
        app.state.device = dev

        # Vérification plus robuste du chargement
        if app.state.yolo_model and app.state.yolo_class_names:
            logger.info("Modèle YOLO et noms de classes chargés avec succès.")
            if isinstance(app.state.weight_models, dict) and app.state.weight_models: # Au moins un modèle de poids chargé
                logger.info(f"Modèles de poids chargés pour les IDs de classe : {list(app.state.weight_models.keys())}")
                app.state.models_fully_loaded = True # Tous les types de modèles attendus sont là
            elif isinstance(app.state.weight_models, dict) and not app.state.weight_models:
                logger.warning("YOLO chargé, mais AUCUN modèle de poids spécifique n'a pu être chargé.")
                app.state.models_fully_loaded = True # L'app peut démarrer, mais sans estimation de poids
            else: # Cas imprévu pour weight_models
                 logger.error("Problème inattendu avec le dictionnaire weight_models.")
                 app.state.models_fully_loaded = False # Marquer comme échec partiel
        else:
            logger.error("ERREUR FATALE : Le modèle YOLO principal ou les noms de classes n'ont pas pu être chargés.")
            app.state.models_fully_loaded = False
            # Envisager de lever une exception ici pour empêcher le démarrage si YOLO est critique
            # raise RuntimeError("Échec du chargement du modèle YOLO critique.")

    except Exception as e:
        logger.error(f"ERREUR FATALE au démarrage lors de l'appel à load_all_ai_models : {e}")
        app.state.models_fully_loaded = False
        # import traceback; traceback.print_exc()
        # raise RuntimeError(f"Erreur chargement modèles : {e}") from e

@app.get("/")
async def read_root():
    return {"message": "Bienvenue sur l'API Fruit Vision !"}

@app.post("/predict/image/")
async def predict_image_upload(request: Request, file: UploadFile = File(...)):
    logger.info(f"Image reçue : {file.filename}, Type : {file.content_type}")

    if not app.state.models_fully_loaded or not request.app.state.yolo_model: # Vérification clé
        logger.error("Tentative de prédiction alors que les modèles ne sont pas (entièrement) chargés.")
        raise HTTPException(status_code=503, detail="Service temporairement indisponible : les modèles IA sont en cours de chargement ou ont échoué.")

    if not file.content_type.startswith("image/"):
        logger.warning(f"Type de fichier invalide reçu : {file.content_type}")
        raise HTTPException(status_code=400, detail="Type de fichier invalide. Veuillez uploader une image.")

    try:
        contents = await file.read()
        pil_image = Image.open(io.BytesIO(contents)).convert("RGB")
        logger.info("Image lue et convertie au format PIL.")
    except Exception as e:
        logger.error(f"Erreur lors du traitement du fichier image uploadé : {e}")
        raise HTTPException(status_code=400, detail=f"Impossible de traiter le fichier image : {e}")

    try:
        results = process_image_for_predictions(
            pil_image=pil_image,
            yolo_model=request.app.state.yolo_model,
            weight_models=request.app.state.weight_models,
            yolo_names_map=request.app.state.yolo_class_names,
            transform=request.app.state.weight_transform,
            device_to_use=request.app.state.device
        )
        logger.info(f"Image traitée. Trouvé {len(results)} détections.")
        return {"filename": file.filename, "detections": results}
    except ValueError as ve: # Attraper les ValueErrors de processing.py
        logger.error(f"Erreur de valeur durant la prédiction : {ve}")
        raise HTTPException(status_code=500, detail=f"Erreur interne du serveur : {str(ve)}")
    except Exception as e:
        logger.error(f"Erreur inattendue durant la prédiction : {e}")
        # import traceback; traceback.print_exc()
        raise HTTPException(status_code=500, detail="Une erreur inattendue est survenue durant la prédiction.")