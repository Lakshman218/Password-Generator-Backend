import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name : { type: String },
  email: { type: String, required: true },
  phone: { type: String},
  password: { type: String, required: true },
  status: { type: Boolean, default: true },
})

export default mongoose.model('User', UserSchema)