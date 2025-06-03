import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ImageUploader from "../components/ImageUploader"; 
import ResultsDisplay from "../components/ResultsDisplay"; 
import { uploadImageForPrediction } from "../services/api"; //  API service 
import { Detection } from "../types/detection"; 
import "./AnalysisPage.css"; 
import { FaInfoCircle, FaRedoAlt } from "react-icons/fa";

interface AggregatedResult {
  count: number;
  totalWeight?: number;
}

const AnalysisPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedFruit = searchParams.get("fruit");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<Detection[] | null>(
    null
  );
  
  const [aggregatedSummary, setAggregatedSummary] = useState<Record<
    string,
    AggregatedResult
  > | null>(null);
  const [instructionMessage, setInstructionMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    let message = "";
    if (preselectedFruit) {
      const fruit = preselectedFruit.toLowerCase();
      const capitalizedFruit = fruit.charAt(0).toUpperCase() + fruit.slice(1);
      if (fruit === "orange") {
        message = `🍊 Pour les Oranges, capturez l'image à une distance ne dépassant pas 2 mètres pour de meilleurs résultats.`;
      } else if (fruit === "strawberry") {
        message = `🍓 Pour les Fraises, une distance de capture inférieure à 0.5 mètre est recommandée.`;
      } else if (fruit === "potato") {
        message = `🥔 Pour les Pommes de Terre, essayez de ne pas dépasser 0.5 mètre pour la prise de vue.`;
      } else {
        message = `💡 Conseils pour ${capitalizedFruit} : Assurez un bon éclairage et une image nette.`;
      }
    } else {
      message =
        "💡 Pour une analyse optimale, assurez-vous que les objets sont bien visibles, bien éclairés et que l'image est nette.";
    }
    setInstructionMessage(message);
  }, [preselectedFruit]);

  const resetAnalysisState = () => {
    setSelectedFile(null);
    if (previewImageUrl) {
      URL.revokeObjectURL(previewImageUrl);
      setPreviewImageUrl(null);
    }
    setAnalysisResults(null);
    setAggregatedSummary(null);
    setAnalysisError(null);
    setIsLoading(false);
    
    if (preselectedFruit) {
      
      const fruit = preselectedFruit.toLowerCase();
      const capitalizedFruit = fruit.charAt(0).toUpperCase() + fruit.slice(1);
      if (fruit === "orange") setInstructionMessage(`🍊 Pour les Oranges...`);
      
      else setInstructionMessage(`💡 Conseils pour ${capitalizedFruit}...`);
    } else {
      setInstructionMessage("💡 Pour une analyse optimale...");
    }
  };

  const handleFileSelected = (file: File | null, previewUrl: string | null) => {
    resetAnalysisState(); 
    setSelectedFile(file);
    setPreviewImageUrl(previewUrl);
  };

  const processAndAggregateResults = (detections: Detection[]) => {
    const summary: Record<string, AggregatedResult> = {};
    detections.forEach((det) => {
      const classNameKey = det.class_name.toLowerCase(); 
      if (!summary[classNameKey]) {
        summary[classNameKey] = { count: 0, totalWeight: undefined };
      }
      summary[classNameKey].count += 1;
      if (
        det.estimated_weight_g !== null &&
        typeof det.estimated_weight_g !== "undefined"
      ) {
        if (summary[classNameKey].totalWeight === undefined) {
          summary[classNameKey].totalWeight = 0;
        }
        summary[classNameKey].totalWeight! += det.estimated_weight_g;
      }
    });
    setAggregatedSummary(summary);
  };

  const handleAnalyzeClick = async () => {
    if (!selectedFile || !previewImageUrl) {
      setAnalysisError("Veuillez d'abord uploader une image.");
      return;
    }
    setIsLoading(true);
    setAnalysisError(null);
    setAnalysisResults(null); 
    setAggregatedSummary(null); 

    try {
      const apiResponse = await uploadImageForPrediction(selectedFile);
      setAnalysisResults(apiResponse.detections);
      if (apiResponse.detections && apiResponse.detections.length > 0) {
        processAndAggregateResults(apiResponse.detections);
        setInstructionMessage(null); 
      } else {
        setInstructionMessage(
          "Aucun objet pertinent n'a été détecté dans l'image."
        );
        
      }
    } catch (err) {
      setAnalysisError(
        err instanceof Error
          ? err.message
          : "Une erreur d'analyse est survenue."
      );
      setInstructionMessage(null); 
    } finally {
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    const currentPreviewUrl = previewImageUrl; 
    return () => {
      if (currentPreviewUrl) {
        URL.revokeObjectURL(currentPreviewUrl);
      }
    };
  }, [previewImageUrl]);

  const fruitsWithWeightEstimation = ["orange", "strawberry", "potato"]; 

  const pageTitleText = preselectedFruit
    ? `Analyser : ${
        preselectedFruit.charAt(0).toUpperCase() + preselectedFruit.slice(1)
      }`
    : "Analyser Votre Image";

  return (
    <div className="analysis-page-new">
      <header className="analysis-page-header">
        <div className="header-text-content">
          {" "}
          <h2 className="page-title">{pageTitleText}</h2>
          <p className="page-subtitle">
            Suivez les conseils et téléchargez votre image pour démarrer.
          </p>
        </div>
      </header>

      {instructionMessage && !isLoading && !analysisResults && (
        <div className="instruction-box">
          <FaInfoCircle className="instruction-icon" />
          <p>{instructionMessage}</p>
        </div>
      )}

      <div className="analysis-pipeline">
        {!selectedFile && !isLoading && (
          <div className="upload-step">
            <h3>1. Télécharger votre image</h3>
            <ImageUploader
              onFileSelect={handleFileSelected}
              disabled={isLoading}
            />
          </div>
        )}

        {selectedFile && previewImageUrl && !analysisResults && !isLoading && (
          <>
            <div className="upload-step">
              {" "}
              <h3>1. Image Sélectionnée pour Analyse</h3>
              <div className="image-preview-container">
                <img
                  src={previewImageUrl}
                  alt="Aperçu avant analyse"
                  className="preview-image"
                />
              </div>
            </div>
            <div className="analyze-button-container">
              <button
                onClick={handleAnalyzeClick}
                className="analyze-now-button"
                disabled={isLoading}
              >
                {isLoading ? "Analyse en cours..." : "Analyser Maintenant"}
              </button>
            </div>
          </>
        )}

        {isLoading && (
          <div className="loading-indicator">
            <div className="simple-css-spinner"></div>
            <p>Analyse en cours, veuillez patienter...</p>
          </div>
        )}

        {analysisError && !isLoading && (
          <div className="analysis-error-container upload-step">
            {" "}
            <h3>Erreur d'Analyse</h3>
            <p className="analysis-error">{analysisError}</p>
            <div className="analyze-button-container">
              {" "}
              <button
                onClick={resetAnalysisState}
                className="analyze-another-button"
              >
                <FaRedoAlt style={{ marginRight: "8px" }} /> Réessayer avec une
                nouvelle image
              </button>
            </div>
          </div>
        )}

        {analysisResults &&
          !isLoading && ( // Ensure results are present and not loading
            <>
              <div className="results-visual-step">
                <h3>2. Visualisation de l'Analyse</h3>
                <div className="analyze-another-container">
                  <button
                    onClick={resetAnalysisState}
                    className="analyze-another-button"
                  >
                    <FaRedoAlt style={{ marginRight: "8px" }} /> Analyser une
                    Autre Image
                  </button>
                </div>
                <div className="results-comparison">
                  <div className="image-container original-image-container">
                    <h4>Image Originale</h4>
                    <img
                      src={previewImageUrl || ""} 
                      alt="Original"
                      className="result-image" 
                    />
                  </div>
                  <div className="image-container analyzed-image-container">
                    <h4>Image Analysée</h4>
                    {previewImageUrl && ( 
                      <ResultsDisplay
                        imageUrl={previewImageUrl} 
                        detections={analysisResults}
                      />
                    )}
                  </div>
                </div>
              </div>

              {aggregatedSummary &&
                Object.keys(aggregatedSummary).length > 0 && (
                  <div className="simplified-summary-container">
                    <h3>Résumé de la Détection</h3>
                    <ul className="summary-list">
                      {Object.entries(aggregatedSummary).map(
                        ([className, data], itemIndex) => (
                          <li
                            key={className}
                            className="summary-item"
                            style={
                              {
                                "--item-index": itemIndex,
                              } as React.CSSProperties
                            }
                          >
                            {" "}
                            {/* For animation delay */}
                            <span className="summary-fruit-name">
                              {className.charAt(0).toUpperCase() +
                                className.slice(1)}
                              :
                            </span>
                            <span className="summary-count">
                              {data.count} détecté(s)
                            </span>
                            {fruitsWithWeightEstimation.includes(
                              className.toLowerCase()
                            ) ? (
                              data.totalWeight !== undefined ? (
                                <span className="summary-weight">
                                  Poids total est. :{" "}
                                  {data.totalWeight.toFixed(1)}g
                                </span>
                              ) : (
                                <span className="summary-weight-na">
                                  Erreur d'estimation du poids
                                </span>
                              )
                            ) : (
                              <span className="summary-weight-na">
                                Poids non disponible
                              </span>
                            )}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              {/* Handle case where results are back but empty */}
              {analysisResults &&
                analysisResults.length === 0 &&
                !aggregatedSummary && (
                  <div className="simplified-summary-container">
                    <h3>Résumé de la Détection</h3>
                    <p>
                      Aucun objet n'a été détecté avec une confiance suffisante
                      dans cette image.
                    </p>
                  </div>
                )}
            </>
          )}
      </div>
    </div>
  );
};

export default AnalysisPage;
