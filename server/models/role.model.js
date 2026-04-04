import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  role_name: {
    type: String,
    enum: ["Admin", "Analyst", "Viewer"],
    required: true,
  },
});

const Role = mongoose.model("Role", roleSchema);
export default Role;