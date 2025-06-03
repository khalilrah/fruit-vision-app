import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

//3D images :
import strawberryIcon3D from "../assets/icons/chilli-3d.png";
import orangeIcon3D from "../assets/icons/orange-3d.png";
import potatoIcon3D from "../assets/icons/watermelon-3d.png";
import HeroMockupImage from "../assets/icons/iPhone 15 Pro.png";
const newSvgStrokeColor = "#6a994e";

const TargetIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke={newSvgStrokeColor} // UPDATED
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const ScaleIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke={newSvgStrokeColor} // UPDATED
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </svg>
);

const ActivityIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke={newSvgStrokeColor} // UPDATED
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const RocketIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke={newSvgStrokeColor} // UPDATED
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const iconContainerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLImageElement[]>([]);

  const handleStartNow = () => {
    navigate("/catalog");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (iconContainerRef.current) {
        const rect = iconContainerRef.current.getBoundingClientRect();
        const scrollPercent = Math.max(
          0,
          Math.min(1, (window.innerHeight - rect.top) / window.innerHeight)
        );

        iconsRef.current.forEach((icon, index) => {
          if (icon) {
            const offset = (index - 1) * 10 * scrollPercent;
            const rotation = scrollPercent * 360; // Simple rotation
            // Keep scale and Y translation, maybe simplify rotation if too much
            icon.style.transform = `translateY(${offset}px) rotateY(${rotation}deg) scale(${
              0.8 + scrollPercent * 0.2
            })`;
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (iconContainerRef.current) {
        const rect = iconContainerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        iconsRef.current.forEach((icon, index) => {
          if (icon) {
            const intensity = 0.1;
            const offsetX =
              mouseX * intensity * (index === 1 ? 1 : index === 0 ? -0.5 : 0.5);
            const offsetY = mouseY * intensity * 0.5;
            icon.style.setProperty("--mouse-x", `${offsetX}px`);
            icon.style.setProperty("--mouse-y", `${offsetY}px`);
          }
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="home-page-wrapper">
      <section className="hero-section">
        <div className="container hero-section-container">
          <div className="hero-content">
            <h1 className="hero-title-animated">
              Votre Allié Intelligent pour l'Agriculture
            </h1>
            <p className="hero-subtitle hero-subtitle-animated">
              Détectez, analysez et estimez le poids de vos fruits et légumes
              avec une précision inégalée grâce à l'intelligence artificielle.
            </p>
            <button
              onClick={handleStartNow}
              className="hero-cta-button hero-cta-animated"
            >
              Commencer Maintenant
              <span className="button-glow"></span>
            </button>
          </div>
          <div className="hero-image-container">
            <div
              className="hero-3d-icon-display enhanced-icon-container"
              ref={iconContainerRef}
            >
              <img
                ref={(el) => {
                  if (el) iconsRef.current[0] = el;
                }}
                src={strawberryIcon3D}
                alt="Fraise 3D"
                className="hero-3d-fruit enhanced-fruit-icon icon-strawberry"
                data-fruit="strawberry"
              />
              <img
                ref={(el) => {
                  if (el) iconsRef.current[1] = el;
                }}
                src={orangeIcon3D}
                alt="Orange 3D"
                className="hero-3d-fruit enhanced-fruit-icon icon-orange"
                data-fruit="orange"
              />
              <img
                ref={(el) => {
                  if (el) iconsRef.current[2] = el;
                }}
                src={potatoIcon3D}
                alt="Produit Agricole 3D"
                className="hero-3d-fruit enhanced-fruit-icon icon-watermelon"
                data-fruit="watermelon"
              />

              <div className="floating-particles">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`particle particle-${i + 1}`}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="our-tool-section" id="our-tool-section-target">
        <div className="container our-tool-section-container">
          <div className="our-tool-image-side">
            <div
              className="tool-mockup-container"
              style={{
                backgroundImage: `url(${HeroMockupImage})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                minHeight: "500px",
                width: "100%",
                backgroundColor: "transparent",
              }}
            ></div>
          </div>
          <div className="our-tool-content-side">
            <h2>
              Notre outil FruitVision AI est conçu pour soutenir votre
              évaluation agricole
            </h2>
            <div className="tool-benefits-grid">
              <div className="benefit-item">
                <div className="benefit-icon-svg">
                  <TargetIcon />
                </div>
                <h3>Taux de Détection Élevé</h3>
                <p>
                  FruitVision AI vise à identifier avec précision un large
                  éventail de vos fruits et légumes.
                </p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon-svg">
                  <ScaleIcon />
                </div>
                <h3>Estimation de Poids Fiable</h3>
                <p>
                  Une estimation précise et optimale du poids pour les oranges,
                  fraises et pommes de terre.
                </p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon-svg">
                  <ActivityIcon />
                </div>
                <h3>Conversion des Données en Actions</h3>
                <p>
                  Transformez rapidement les images en informations exploitables
                  pour une meilleure prise de décision.
                </p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon-svg">
                  <RocketIcon />
                </div>
                <h3>Adaptabilité Rapide</h3>
                <p>
                  FruitVision AI est un module conçu pour s'intégrer et évoluer
                  avec vos besoins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-section-container">
          <h2>Prêt à Transformer Votre Agriculture ?</h2>
          <button
            onClick={() => navigate("/catalog")}
            className="cta-secondary-button"
          >
            Explorer le Catalogue
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
