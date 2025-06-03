// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AnalysisPage from "./pages/AnalysisPage";
import CatalogPage from "./pages/CatalogPage";
// import HistoryPage from './pages/HistoryPage';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="page-content">
          {" "}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analyze" element={<AnalysisPage />} />
            <Route path="/catalog" element={<CatalogPage />} />{" "}
            {/* <Route path="/history" element={<HistoryPage />} /> */}
            {/* Ajoutez une route 404 ici si nécessaire */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
