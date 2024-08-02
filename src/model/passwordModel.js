import mongoose from "mongoose";

const PasswordSchema = mongoose.Schema({
  userId : { type: String },
  title: { type: String },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Password', PasswordSchema);