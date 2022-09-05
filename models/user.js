import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  role: String,
});

const User = models.User || model("User", userSchema);

export default User;
