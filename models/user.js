import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  userType: String,
  firstName: String,
  lastName: String,
  email: String,
  userType: String,
});

const User = models.User || model("User", userSchema);

export default User;
