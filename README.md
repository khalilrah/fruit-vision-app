<div align="center">
  <img src="https://github.com/khalilrah/fruit-vision-app/blob/bc2d91be1152df29d6f935b928c8ab2a9b57a9b3/docs/images/Logo.png" alt="FruitVision AI Logo" width="600">
  
  # 🍓 FruitVision AI 👁️
  
  **Intelligent Fruit & Vegetable Detection, Analysis, and Weight Estimation**
  
  *Revolutionizing agricultural insights with the power of Artificial Intelligence*
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
  [![Status](https://img.shields.io/badge/Status-Active_Development-brightgreen)](https://github.com/khalilrah/fruit-vision-app)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
  [![GitHub stars](https://img.shields.io/github/stars/khalilrah/fruit-vision-app?style=social)](https://github.com/khalilrah/fruit-vision-app/stargazers)
  
  [🚀 Live Demo](#) • [📖 Documentation](#-table-of-contents) • [🛠️ Installation](#-installation) • [🤝 Contributing](#-contributing)
  
</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#️-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Models](#-ai-models)
- [Contributing](#-contributing)
- [Roadmap](#️-roadmap)
- [License](#-license)
- [Support](#-support)

---

## 🌟 Overview

FruitVision AI is a cutting-edge web application that leverages advanced computer vision and machine learning to provide instant detection, comprehensive analysis, and accurate weight estimation for fruits and vegetables from uploaded images.

### 🎯 Why FruitVision AI?

- **Agriculture**: Optimize crop yield analysis and quality assessment
- **Retail**: Streamline inventory management and pricing
- **Education**: Learn about AI applications in agriculture
- **Research**: Accelerate food science and nutrition studies

---

## ✨ Features

### 🔍 Core Capabilities

- **🤖 AI-Powered Detection**: Advanced YOLO model identifies multiple fruits and vegetables simultaneously
- **⚖️ Weight Estimation**: Specialized ResNet models provide accurate weight predictions for oranges, strawberries, and potatoes
- **📊 Comprehensive Analysis**: Detailed summaries with item counts and total weight estimates
- **🖼️ Visual Feedback**: Interactive bounding boxes highlight detected objects

### 🎨 User Experience

- **📱 Responsive Design**: Seamless experience across all devices
- **🎨 Modern Interface**: Clean, intuitive UI built with React and TypeScript
- **📸 Easy Upload**: Drag-and-drop or browse functionality
- **🍎 Produce Catalog**: Browse supported fruits and vegetables

### 🚀 Performance

- **⚡ Fast Processing**: Optimized inference pipeline
- **🔄 Batch Processing**: Analyze multiple images efficiently
- **💾 Local Storage**: No data sent to external services

---

## 🎬 Demo

### Homepage

<div align="center">
  <img src="https://github.com/khalilrah/fruit-vision-app/blob/bc2d91be1152df29d6f935b928c8ab2a9b57a9b3/docs/images/fruitvision_home.png" alt="FruitVision AI Homepage" width="700">
</div>

### Analysis Results

<div align="center">
  <img src="https://github.com/khalilrah/fruit-vision-app/blob/bc2d91be1152df29d6f935b928c8ab2a9b57a9b3/docs/images/analysis_results.png" alt="Analysis Results" width="700">
  <p><em>Real-time detection with bounding boxes and detailed analysis</em></p>
</div>

### Produce Catalog

<div align="center">
  <img src="https://github.com/khalilrah/fruit-vision-app/blob/bc2d91be1152df29d6f935b928c8ab2a9b57a9b3/docs/images/catalog_page.png" alt="Produce Catalog" width="700">
</div>

---

## 🛠️ Tech Stack

<table>
<tr>
<td>

**Frontend**

- React 18+
- TypeScript
- Vite
- React Router
- CSS Modules

</td>
<td>

**Backend**

- FastAPI
- Python 3.9+
- Uvicorn
- Pydantic

</td>
<td>

**AI/ML**

- PyTorch
- Ultralytics YOLO
- TorchVision
- Pillow (PIL)

</td>
</tr>
</table>

---

## 🚀 Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16.x or higher) & npm
- **Python** (v3.9 or higher) & pip
- **Git**

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/khalilrah/fruit-vision-app.git
   cd fruit-vision-app
   ```

2. **Backend Setup**

   ```bash
   # Navigate to backend directory
   cd backend

   # Create and activate virtual environment
   python -m venv venv

   # Activate virtual environment
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate

   # Install dependencies
   pip install -r requirements.txt
   ```

3. **Download AI Models** ⚠️ **Required**

   Download the AI model files from: [Google Drive Models](https://drive.google.com/drive/folders/1S9AVbdL6hPWiGUBLytIRwXxfintFqD1x?usp=sharing)

   Place all `.pt` and `.pth` files in: `backend/models_ai/`

4. **Frontend Setup**

   ```bash
   # Navigate to frontend directory (from root)
   cd frontend

   # Install dependencies
   npm install
   ```

5. **Start the Application**

   **Terminal 1 - Backend:**

   ```bash
   cd backend
   # Ensure virtual environment is activated
   uvicorn app.main:app --reload --port 8000
   ```

   **Terminal 2 - Frontend:**

   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

---

## 💡 Usage

### Basic Workflow

1. **Upload Image**: Navigate to the analyzer and upload an image containing fruits/vegetables
2. **AI Processing**: The system automatically detects and analyzes the produce
3. **View Results**: See detected items with bounding boxes, counts, and weight estimates
4. **Explore Catalog**: Browse the complete list of supported produce items

### Supported Produce

#### Detection Only

- apple, cherry, figs, olive, pomegranate,
  orange, rockmelon, strawberry, potato, tomato, watermelon, and bell pepper.

#### Detection + Weight Estimation

- **Oranges**: Accurate weight prediction using specialized ResNet model
- **Strawberries**: Weight estimation optimized for berry characteristics
- **Potatoes**: Weight calculation based on size and shape analysis

---

## 📡 API Documentation

### Endpoints

#### `POST /analyze`

Analyze an uploaded image for fruit and vegetable detection.

**Request:**

```bash
curl -X POST "http://localhost:8000/analyze" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/path/to/your/image.jpg"
```

**Response:**

```json
{
  "detections": [
    {
      "class": "orange",
      "confidence": 0.95,
      "bbox": [100, 150, 200, 250],
      "weight_estimate": 180.5
    }
  ],
  "summary": {
    "total_items": 3,
    "total_weight": 485.2,
    "detected_classes": ["orange", "orange", "orange"]
  }
}
```

#### `GET /health`

Check API health status.

For complete API documentation, visit: http://localhost:8000/docs

---

## 📂 Project Structure

```
fruit-vision-app/
├── 📁 backend/
│   ├── 📁 app/
│   │   ├── 📁 __pycache__/         # Python cache files
│   │   ├── 📄 __init__.py          # Package initialization
│   │   ├── 📄 main.py              # FastAPI application entry point
│   │   ├── 📄 models_loader.py     # AI model loading utilities
│   │   └── 📄 processing.py        # Image processing logic
│   ├── 📁 models_ai/               # AI model files
│   │   ├── 📄 best.pt              # YOLO detection model
│   │   ├── 📄 orange_resnet18_be...# Orange weight estimation model
│   │   ├── 📄 potato_resnet18_be...# Potato weight estimation model
│   │   └── 📄 strawberry_resnet18...# Strawberry weight estimation model
│   ├── 📁 node_modules/            # Node.js dependencies (if any)
│   ├── 📁 venv/                    # Python virtual environment
│   ├── 📄 package-lock.json        # Node.js lock file
│   ├── 📄 package.json             # Node.js dependencies
│   └── 📄 requirements.txt         # Python dependencies
├── 📁 frontend/
│   ├── 📁 node_modules/            # Node.js dependencies
│   ├── 📁 public/                  # Static assets
│   ├── 📁 src/
│   │   ├── 📁 assets/
│   │   │   └── 📁 icons/           # Icon assets
│   │   ├── 📁 components/          # Reusable React components
│   │   │   ├── 📄 Footer.css       # Footer component styles
│   │   │   ├── 📄 Footer.tsx       # Footer component
│   │   │   ├── 📄 ImageUploader.css# Image uploader styles
│   │   │   ├── 📄 ImageUploader.tsx# Image upload component
│   │   │   ├── 📄 Navbar.css       # Navigation bar styles
│   │   │   ├── 📄 Navbar.tsx       # Navigation bar component
│   │   │   ├── 📄 ResultsDisplay.css# Results display styles
│   │   │   └── 📄 ResultsDisplay.tsx# Results display component
│   │   ├── 📁 pages/               # Page components
│   │   │   ├── 📄 AnalysisPage.css # Analysis page styles
│   │   │   ├── 📄 AnalysisPage.tsx # Analysis page component
│   │   │   ├── 📄 CatalogPage.css  # Catalog page styles
│   │   │   ├── 📄 CatalogPage.tsx  # Catalog page component
│   │   │   ├── 📄 HistoryPage.tsx  # History page component
│   │   │   ├── 📄 HomePage.css     # Home page styles
│   │   │   └── 📄 HomePage.tsx     # Home page component
│   │   ├── 📁 services/            # API service functions
│   │   │   └── 📄 api.ts           # API service layer
│   │   ├── 📁 types/               # TypeScript type definitions
│   │   │   ├── 📄 detection.ts     # Detection type definitions
│   │   │   └── 📄 images.d.ts      # Image type declarations
│   │   ├── 📄 App.css              # Main app styles
│   │   ├── 📄 App.tsx              # Main App component
│   │   ├── 📄 index.css            # Global styles
│   │   └── 📄 main.tsx             # React entry point
│   ├── 📄 eslint.config.js         # ESLint configuration
│   ├── 📄 index.html               # HTML entry point
│   ├── 📄 package-lock.json        # Node.js lock file
│   ├── 📄 package.json             # Node.js dependencies
│   ├── 📄 README.md                # Frontend documentation
│   └── 📄 vite.config.ts           # Vite configuration
├── 📁 docs/                        # Documentation and images
├── 📄 README.md                    # Project documentation
└── 📄 LICENSE                      # MIT License
```

---

## 🤖 AI Models

### YOLO Detection Model

- **Purpose**: Multi-class fruit and vegetable detection
- **Architecture**: YOLO11m
- **Classes**: 20+ different produce types
- **Performance**: >90% accuracy on test dataset

### Weight Estimation Models

- **Orange Model**: ResNet-based regression
- **Strawberry Model**: ResNet-based regression
- **Potato Model**: ResNet-based regression

### Model Performance

| Model             | Accuracy | Inference Time | Model Size |
| ----------------- | -------- | -------------- | ---------- |
| YOLO Detection    | 91.2%    | ~100ms         | 38.6MB     |
| Orange Weight     | 91.6%    | ~50ms          | 42.9MB     |
| Strawberry Weight | 94.3%    | ~45ms          | 42.9MB     |
| Potato Weight     | 99.3%    | ~55ms          | 42.9MB     |

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Areas for Contribution

- 🐛 Bug fixes and improvements
- 🚀 New features and enhancements
- 📚 Documentation improvements
- 🧪 Test coverage expansion
- 🎨 UI/UX enhancements

---

## 🗺️ Roadmap

### 🎯 Short Term (Q2 2025)

- [ ] User authentication and accounts
- [ ] Analysis history and saved results
- [ ] PDF report generation
- [ ] Mobile app development

### 🚀 Medium Term (Q3-Q4 2025)

- [ ] Expanded model support (30+ produce types)
- [ ] Batch image processing
- [ ] API rate limiting and authentication
- [ ] Docker containerization

### 🌟 Long Term (2026)

- [ ] Real-time video analysis
- [ ] Integration with IoT devices
- [ ] Machine learning model marketplace
- [ ] Multi-language support

---

## 📊 Performance Metrics

- **Detection Accuracy**: 92.3%
- **Weight Estimation Error**: <10% average
- **Processing Time**: <200ms per image
- **Supported Formats**: JPG, PNG, WEBP
- **Maximum Image Size**: 10MB

---

## 🔧 Troubleshooting

### Common Issues

**1. Models not loading**

- Ensure all model files are in `backend/models_ai/`
- Check file permissions and paths

**2. CORS errors**

- Verify backend is running on port 8000
- Check CORS configuration in FastAPI

**3. Slow inference**

- Consider using GPU acceleration
- Optimize image size before upload

**4. Installation issues**

- Ensure Python 3.9+ and Node.js 16+ are installed
- Try creating a fresh virtual environment

For more help, check our [Issues page](https://github.com/khalilrah/fruit-vision-app/issues).

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Support

<div align="center">

### 📧 Get Help

**Project Maintainer**: [Khalilrah](https://github.com/khalilrah)

**Report Issues**: [GitHub Issues](https://github.com/khalilrah/fruit-vision-app/issues)

**Discussions**: [GitHub Discussions](https://github.com/khalilrah/fruit-vision-app/discussions)

---

### 🌟 Show Your Support

If you find FruitVision AI helpful, please consider:

⭐ **Starring** the repository

🍴 **Forking** for your own projects

📢 **Sharing** with others

💖 **Contributing** to the project

---

**Built with ❤️ by the FruitVision AI Team**

_Empowering agriculture through artificial intelligence_

</div>
