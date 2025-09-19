import mongoose from "mongoose";
import  dotnev from "dotenv";
dotnev.config();

const ConnectDB= async ()=>{
    try{
    await mongoose.connect(process.env.MONGODB_URI);
     console.log("Connected to MongoDB 🙏🙏");
     

    }catch(error){
        console.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1);
    }
}

//module.exports=ConnectDB;
export default ConnectDB;