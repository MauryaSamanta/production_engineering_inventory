import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({

  name: String,

  email: {
    type: String,
    unique: true
  },

  password: String,

  role: {
    type: String,
    enum: ["admin", "subadmin"],
    default: "subadmin"
  }

});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password =  bcrypt.hash(this.password, 10);
});

export default mongoose.model("User", UserSchema);