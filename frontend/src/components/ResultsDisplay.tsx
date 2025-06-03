import React, { useState, useEffect, useRef } from "react";
import { Detection } from "../types/detection";
import "./ResultsDisplay.css"; // Styles are applied

interface ResultsDisplayProps {
  imageUrl: string;
  detections: Detection[];
}

const boundingBoxBorderColor = "#a7c957";
const labelBackgroundColor = "#a7c957";
const labelTextColor = "#386641";

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  imageUrl,
  detections,
}) => {
  const imageElementRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{
    naturalWidth: number;
    naturalHeight: number;
    displayWidth: number;
    displayHeight: number;
  } | null>(null);

  const calculateImageDimensions = () => {
    if (!imageElementRef.current || !imageElementRef.current.complete) return;

    const imgElement = imageElementRef.current;
    const rect = imgElement.getBoundingClientRect();

    const displayWidth = rect.width;
    const displayHeight = rect.height;
    const naturalWidth = imgElement.naturalWidth;
    const naturalHeight = imgElement.naturalHeight;

    if (
      naturalWidth > 0 &&
      naturalHeight > 0 &&
      displayWidth > 0 &&
      displayHeight > 0
    ) {
      setImageDimensions({
        naturalWidth,
        naturalHeight,
        displayWidth,
        displayHeight,
      });
    }
  };

  useEffect(() => {
    if (imageUrl && imageLoaded) {
      calculateImageDimensions();
    }
  }, [imageUrl, imageLoaded]);

  useEffect(() => {
    // Recalculate on window resize
    const handleResize = () => {
      if (imageLoaded && imageElementRef.current?.complete) {
        setTimeout(calculateImageDimensions, 50);
      }
    };

    window.addEventListener("resize", handleResize);

    if (imageLoaded && imageElementRef.current?.complete) {
      calculateImageDimensions();
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [imageLoaded]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (!imageUrl) return null;

  return (
    <div className="results-display-wrapper">
      <img
        ref={imageElementRef}
        src={imageUrl}
        alt="Image avec détections"
        className="result-image-with-boxes"
        onLoad={handleImageLoad}
      />

      {imageLoaded &&
        imageDimensions &&
        detections.map((det, index) => {
          const scaleX =
            imageDimensions.displayWidth / imageDimensions.naturalWidth;
          const scaleY =
            imageDimensions.displayHeight / imageDimensions.naturalHeight;

          const scaledBbox = {
            xmin: Math.round(det.bounding_box.xmin * scaleX),
            ymin: Math.round(det.bounding_box.ymin * scaleY),
            width: Math.round(
              (det.bounding_box.xmax - det.bounding_box.xmin) * scaleX
            ),
            height: Math.round(
              (det.bounding_box.ymax - det.bounding_box.ymin) * scaleY
            ),
          };

          // Ensure the box doesn't exceed image boundaries (more robustly)
          scaledBbox.xmin = Math.max(0, scaledBbox.xmin);
          scaledBbox.ymin = Math.max(0, scaledBbox.ymin);

          const boxRightEdge = scaledBbox.xmin + scaledBbox.width;
          const boxBottomEdge = scaledBbox.ymin + scaledBbox.height;

          scaledBbox.width = Math.min(
            scaledBbox.width,
            imageDimensions.displayWidth - scaledBbox.xmin
          );
          scaledBbox.height = Math.min(
            scaledBbox.height,
            imageDimensions.displayHeight - scaledBbox.ymin
          );

          // Ensure positive dimensions after clipping
          scaledBbox.width = Math.max(1, scaledBbox.width);
          scaledBbox.height = Math.max(1, scaledBbox.height);

          const boxStyle: React.CSSProperties = {
            position: "absolute",
            left: `${scaledBbox.xmin}px`,
            top: `${scaledBbox.ymin}px`,
            width: `${scaledBbox.width}px`,
            height: `${scaledBbox.height}px`,
            border: `2px solid ${boundingBoxBorderColor}`, // UPDATED
            borderRadius: "6px", // Match CSS
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.35)", // Slightly softer shadow
            pointerEvents: "none", // Keep this
            boxSizing: "border-box", // Keep this
            // backgroundColor: `rgba(${hexToRgb(boundingBoxBorderColor)}, 0.05)`, // Optional: very light tint
          };

          const isNearTop = scaledBbox.ymin < 25;
          const labelStyle: React.CSSProperties = {
            position: "absolute",
            left: "3px",
            backgroundColor: labelBackgroundColor,
            color: labelTextColor,
            padding: "3px 7px",
            fontSize: "11px",
            fontWeight: "600",
            borderRadius: "4px",
            whiteSpace: "nowrap",
            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)",
            zIndex: 10,
          };

          if (isNearTop) {
            labelStyle.top = "3px";
          } else {
            labelStyle.bottom = "100%";
            labelStyle.marginBottom = "3px";
          }

          return (
            <div key={index} style={boxStyle} className="detection-box-stylish">
              <span style={labelStyle}>
                {det.class_name.charAt(0).toUpperCase() +
                  det.class_name.slice(1)}
                {det.estimated_weight_g !== null &&
                typeof det.estimated_weight_g !== "undefined" &&
                ["orange", "strawberry", "potato"].includes(
                  // Ensure this list is accurate
                  det.class_name.toLowerCase()
                )
                  ? ` - ${det.estimated_weight_g.toFixed(1)}g`
                  : ""}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default ResultsDisplay;
