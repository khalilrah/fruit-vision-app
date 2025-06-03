export interface BoundingBox { xmin: number; ymin: number; xmax: number; ymax: number; }
export interface Detection {
  class_id: number; class_name: string; confidence: number;
  bounding_box: BoundingBox; estimated_weight_g?: number | null;
}
export interface ApiResponse {
  filename: string; detections: Detection[];
  annotated_image_path?: string; 
}