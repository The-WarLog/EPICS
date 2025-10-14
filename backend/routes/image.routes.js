import { Router } from "express";
//BULLSHIT
import uploadImage from "../controllers/imageUpload.controller.js";
import { uploadMulter } from "../middleware/MulterConfig.js";

const ImageRouter = Router();

// Upload image for analysis
ImageRouter.post('/ImageUpload', uploadMulter.single("image"), uploadImage);

export default ImageRouter;