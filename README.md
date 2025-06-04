<div align="center">
  <img src="https://github.com/khalilrah/fruit-vision-app/blob/bc2d91be1152df29d6f935b928c8ab2a9b57a9b3/docs/images/Logo.png" alt="FruitVision AI Logo/Banner" width="600">
  <h1>🍓 FruitVision AI 👁️</h1>
  <p>
    <strong>Intelligent Fruit & Vegetable Detection, Analysis, and Weight Estimation</strong>
  </p>
  <p>
    Revolutionizing agricultural insights with the power of Artificial Intelligence.
  </p>
  <p>
    <!-- Badges: Replace placeholders with actual links/services -->
    <a href="YOUR_LICENSE_LINK_IF_ANY">
      <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
    </a>
    <a href="YOUR_PROJECT_STATUS_LINK_OR_REMOVE">
      <img src="https://img.shields.io/badge/Status-Active_Development-brightgreen" alt="Project Status">
    </a>
    <a href="YOUR_CONTRIBUTION_GUIDELINES_LINK_OR_REMOVE">
      <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
    </a>
    <a href="https://github.com/khalilrah/fruit-vision-app/stargazers">
      <img src="https://img.shields.io/github/stars/khalilrah/fruit-vision-app?style=social" alt="GitHub stars">
    </a>
  </p>
  <p>
    <a href="LINK_TO_LIVE_DEMO_IF_AVAILABLE"><strong>🚀 View Live Demo</strong></a>
       |   
    <a href="#-getting-started"><strong>🛠️ Get Started Locally</strong></a>
       |   
    <a href="#-contributing"><strong>🤝 Contribute</strong></a>
  </p>
</div>

---

## 🌟 Overview

FruitVision AI is a sophisticated web application leveraging state-of-the-art AI to provide users with instant detection, detailed analysis, and accurate weight estimations for a variety of fruits and vegetables directly from uploaded images. Whether you're in agriculture, retail, or just curious, FruitVision AI offers valuable insights at your fingertips.

Our platform aims to simplify complex image analysis, making AI accessible and practical for everyday use in the agricultural domain and beyond.

---

## ✨ Key Features

*   📸 **Intuitive Image Upload:** Simple drag-and-drop or browse interface for image submission.
*   🤖 **AI-Powered Detection:** Employs a robust YOLO model for accurate identification of multiple fruits and vegetables within an image.
*   ⚖️ **Precise Weight Estimation:** Specialized ResNet-based models provide weight estimates for key produce like Oranges, Strawberries, and Potatoes.
*   📊 **Comprehensive Analysis Summary:** Clear, concise summaries detailing detected items, their counts, and total estimated weights.
*   🖼️ **Visual Feedback with Bounding Boxes:** Detected objects are clearly highlighted with bounding boxes on the analyzed image.
*   🍎 **Browsable Produce Catalog:** An informative catalog showcasing the range of items the AI can analyze.
*   📱 **Responsive Design:** A seamless experience across desktop, tablet, and mobile devices.
*   🎨 **Modern & Clean UI:** Built with React and Vite, featuring a user-friendly interface designed for optimal user experience with a customizable theme.

---

## 🖼️ Application Showcase

**1. Homepage - Your Intelligent Ally:**
*Brief description of what the user sees and can do.*
<div align="center">
  <img src="https://github.com/khalilrah/fruit-vision-app/blob/bc2d91be1152df29d6f935b928c8ab2a9b57a9b3/docs/images/fruitvision_home.png" alt="FruitVision AI Homepage" width="700">
</div>

**2. Easy Image Upload & Analysis:**
*Show the image uploader and the analysis results page with bounding boxes and summary.*
<div align="center">
  <img src="https://github.com/khalilrah/fruit-vision-app/blob/bc2d91be1152df29d6f935b928c8ab2a9b57a9b3/docs/images/analysis_results.png" alt="FruitVision AI Analysis Process" width="700">
  <p><em>Image Upload -> Detection -> Detailed Summary</em></p>
</div>

**3. Produce Catalog:**
*Highlight the catalog page.*
<div align="center">
  <img src="https://github.com/khalilrah/fruit-vision-app/blob/bc2d91be1152df29d6f935b928c8ab2a9b57a9b3/docs/images/catalog_page.png" alt="FruitVision AI Catalog" width="700">
</div>

---

## 🛠️ Tech Stack

A blend of modern technologies for a robust and scalable application:

| Category      | Technology                                       |
|---------------|--------------------------------------------------|
| **Frontend**  | React 18+, TypeScript, Vite, React Router, CSS   |
| **Backend**   | FastAPI (Python 3.9+)                            |
| **AI/ML**     | PyTorch, Ultralytics YOLO, TorchVision           |
| **Image Lib** | Pillow (PIL)                                     |
| **Serving**   | Uvicorn                                          |

---

## 📂 Project Structure

A well-organized monorepo structure for clarity and maintainability:

fruit-vision-app/
├── .git/
├── .gitignore
├── README.md
├── backend/
│ ├── app/ # Core backend logic
│ ├── models_ai/ # AI model weights (.pt, .pth)
│ └── requirements.txt
└── frontend/
├── public/
├── src/ # Core frontend source
│ ├── assets/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── types/
│ ├── App.tsx
│ ├── main.tsx
│ └── index.css # Global styles & CSS theme variables
├── index.html
├── package.json
└── vite.config.ts


---

## 🚀 Getting Started

Follow these steps to get FruitVision AI running on your local machine for development and testing.

### Prerequisites

*   Node.js (v16.x or newer) & npm (or yarn)
*   Python (v3.9 or newer) & pip
*   Git

### 1. Clone the Repository
```bash
git clone https://github.com/khalilrah/fruit-vision-app.git
cd fruit-vision-app

2. Backend Setup

Navigate to the backend directory to set up the Python environment and dependencies.
cd backend
python -m venv venv # Create a virtual environment

Activate the virtual environment:
Windows: venv\Scripts\activate
macOS/Linux: source venv/bin/activate

pip install -r requirements.txt

Important: AI Models
The AI models are essential for the application to function.
Download the model files from: [https://drive.google.com/drive/folders/1S9AVbdL6hPWiGUBLytIRwXxfintFqD1x?usp=sharing]
Place all downloaded .pt and .pth files into the fruit_vision-app/backend/models_ai/ directory.
3. Frontend Setup
Navigate to the frontend directory to install Node.js dependencies.
cd ../frontend # From the backend directory, or navigate from root
npm install # or yarn install

4. Running the Application
You need to run both the backend and frontend servers concurrently in separate terminal windows.
Terminal 1: Start Backend (FastAPI)
Ensure you are in the backend directory and the virtual environment is activated.

uvicorn app.main:app --reload --port 8000

API will be live at http://localhost:8000.
Terminal 2: Start Frontend (Vite + React)
Ensure you are in the frontend directory.

npm run dev # or yarn dev

The application will be accessible, typically at http://localhost:5173 (check your terminal output).
🎯 Usage
Navigate to the application in your browser.
Go to the "Analyser" or "Upload" section.
Upload an image containing fruits or vegetables using the provided interface.
View the results: The application will display the detected items, their bounding boxes on the image, and a summary including counts and estimated weights (where available).
Explore the Catalog to see the range of produce our AI recognizes.
(If history features were implemented, this section would be more detailed)
🗺️ Project Roadmap (Future Enhancements)
We're always looking to improve FruitVision AI! Here are some features on our horizon:
User Accounts: To save analysis history per user.
Advanced History Management: Filtering, sorting, and detailed views for saved analyses.
PDF Report Generation: Downloadable PDF summaries of detection results.
Expanded Model Support: Adding detection and weight estimation for more types of produce.
Batch Image Processing: Allowing users to upload and analyze multiple images at once.
API for Developers: Providing public API access for integration into other systems.
Improved Mobile UX: Further refinements for an even better mobile experience.
🤝 Contributing
We welcome contributions to FruitVision AI! Whether it's bug fixes, feature enhancements, or documentation improvements, your help is appreciated.
Please follow these steps:
Fork the repository.
Create a new branch for your feature or fix (git checkout -b feature/your-amazing-feature).
Make your changes and commit them with clear messages.
Push your branch to your fork (git push origin feature/your-amazing-feature).
Open a Pull Request against our main branch.
Please ensure your code adheres to our coding standards (to be defined - e.g., linting, testing) and that your PR includes a clear description of the changes.
📜 License
This project is licensed under the MIT License. See the LICENSE file for more details.
(TODO: Create a LICENSE file in the root of your project with the MIT License text if you choose this license.)
📧 Contact & Support
Project Maintainer: Khalilrah ([https://github.com/khalilrah])
Issues: Please report bugs or request features via the GitHub Issues page.
<div align="center">
<p>Thank you for checking out FruitVision AI! We hope you find it useful and insightful.</p>
<p>⭐ Star us on GitHub if you like the project! ⭐</p>
</div>
```