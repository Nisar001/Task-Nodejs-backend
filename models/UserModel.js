import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
   },
   useremail: {
      type: String,
      required: true,
      unique: true,
   },
   phone: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
      uniue: false,
   },
   role:{
      type: Number,
      default: 0,
   }
});

export default mongoose.model('User', UserSchema);