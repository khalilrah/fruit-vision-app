// src/services/api.ts
import axios from 'axios';
import { ApiResponse } from '../types/detection';

const API_BASE_URL = 'http://localhost:8000';

export const uploadImageForPrediction = async (file: File): Promise<ApiResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await axios.post<ApiResponse>(`${API_BASE_URL}/predict/image/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'upload/prédiction :", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.detail || "Échec de l'obtention de la prédiction.");
    }
    throw new Error("Erreur inconnue lors de l'upload.");
  }
};