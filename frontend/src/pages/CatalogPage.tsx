import React from "react";
import { useNavigate } from "react-router-dom";
import "./CatalogPage.css";

import appleIcon from "../assets/icons/apple.png";
import cherryIcon from "../assets/icons/cherry.png";
import figuesIcon from "../assets/icons/fig.png";
import oliveIcon from "../assets/icons/olive.png";
import pomegranateIcon from "../assets/icons/pomegranate.png";
import orangeIcon from "../assets/icons/orange.png";
import rockmelonIcon from "../assets/icons/rockmelon.png";
import strawberryIcon from "../assets/icons/strawberry.png";
import potatoIcon from "../assets/icons/potato.png";
import tomatoIcon from "../assets/icons/tomato.png";
import watermelonIcon from "../assets/icons/watermelon.png";
import bellpepperIcon from "../assets/icons/bellpepper.png";

interface CatalogItem {
  id: string;
  name: string;
  icon: string;
  weightEstimationAvailable: boolean;
}

const catalogData: CatalogItem[] = [
  {
    id: "apple",
    name: "Pomme",
    icon: appleIcon,
    weightEstimationAvailable: false,
  },
  {
    id: "cherry",
    name: "Cerise",
    icon: cherryIcon,
    weightEstimationAvailable: false,
  },
  {
    id: "figues",
    name: "Figue",
    icon: figuesIcon,
    weightEstimationAvailable: false,
  },
  {
    id: "olive",
    name: "Olive",
    icon: oliveIcon,
    weightEstimationAvailable: false,
  },
  {
    id: "pomegranate",
    name: "Grenade",
    icon: pomegranateIcon,
    weightEstimationAvailable: false,
  },
  {
    id: "orange",
    name: "Orange",
    icon: orangeIcon,
    weightEstimationAvailable: true,
  },
  {
    id: "rockmelon",
    name: "Melon Cantaloup",
    icon: rockmelonIcon,
    weightEstimationAvailable: false,
  },
  {
    id: "strawberry",
    name: "Fraise",
    icon: strawberryIcon,
    weightEstimationAvailable: true,
  },
  {
    id: "potato",
    name: "Pomme de Terre",
    icon: potatoIcon,
    weightEstimationAvailable: true,
  },
  {
    id: "tomato",
    name: "Tomate",
    icon: tomatoIcon,
    weightEstimationAvailable: false,
  },
  {
    id: "watermelons",
    name: "Pastèque",
    icon: watermelonIcon,
    weightEstimationAvailable: false,
  },
  {
    id: "bellpeppers",
    name: "Poivron",
    icon: bellpepperIcon,
    weightEstimationAvailable: false,
  },
];

const CatalogPage: React.FC = () => {
  const navigate = useNavigate();

  const handleFruitSelect = (fruitId: string) => {
    navigate(`/analyze?fruit=${fruitId}`);
  };

  return (
    <div className="catalog-page">
      <h2>Catalogue des Fruits & Légumes</h2>
      <p>
        Sélectionnez un fruit ou un légume pour commencer une analyse ou en
        savoir plus.
      </p>
      <div className="catalog-grid">
        {catalogData.map((item) => (
          <div
            key={item.id}
            className="catalog-item-card"
            onClick={() => handleFruitSelect(item.id)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ")
                handleFruitSelect(item.id);
            }}
            aria-label={`Analyser ${item.name}`}
          >
            <img
              src={item.icon}
              alt={item.name}
              className="catalog-item-icon"
            />
            <h3>{item.name}</h3>
            {item.weightEstimationAvailable && (
              <span className="weight-estimation-badge">Poids Estimable</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
