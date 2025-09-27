import { model, Schema } from "mongoose";


const UserProfileDetailsSchema = new Schema({
  fullName:{
    type:String,
    required:true
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber:{
    type:String,
    required:true,
    unique:true
  },
  address:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true
  },
  PinCode:{
    type:Number
  },
  country:{
    type:String,
    required:true
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required : true

  }
},{timestamps:true

});

const profileDetailsModel = model("UserProfileDetails", UserProfileDetailsSchema);

export default profileDetailsModel;