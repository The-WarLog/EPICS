import { Router } from "express";
//BULLSHIT
import uploadImage from "../controllers/imageUpload.controller.js";
import { uploadMulter } from "../middleware/MulterConfig.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const ImageRouter = Router();

// Upload image for analysis
ImageRouter.post('/ImageUpload', uploadMulter.single("image"),requireAuth, uploadImage);

export default ImageRouter;