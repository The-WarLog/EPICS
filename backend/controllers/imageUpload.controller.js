//import { uploadMulter } from "../middleware/MulterConfig.js";


const uploadImage=(req,res)=>{
    try{
        if(!req.file || req.file.length===0){
            res.status(400).json({message:"No file uploaded"});
    }
    res.status(200).json({message:"File uploaded successfully",file:req.file});
}catch(error){
    res.status(500).json({message:"Server error",error:error.message});
}
}

export default uploadImage;