import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {  
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role_id: {   // reference to Roles (optional)
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },

  role: {
    type: String,
    enum: ["admin", "analyst", "viewer"],
    default: "viewer",
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;