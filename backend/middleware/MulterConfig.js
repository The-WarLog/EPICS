import multer from "multer";


const upload= multer({
    destination: "uploads/"
})
// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req,res,cb)=>{
        cb(null,'uploads/');
    },
    filename: (req,file,cb)=>{
        const uniqueName= `${Date.now()}-${file.originalname}`;
        cb(null,uniqueName);

    }
})//tf did i did here 

const fileFilter=(req,file,cb)=>{
    const allowedTypes=['image/jpeg','image/png','image/gif'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'),false);
    }
}
export const uploadMulter= multer({storage,fileFilter});