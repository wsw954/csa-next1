import { Schema, model, models } from "mongoose";

const vehicleSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "creatorType",
  },
  userRole: { type: String, required: true, enum: ["Dealer", "Buyer"] },
  make: String,
  model: String,
});

const Vehicle = models.Vehicle || model("Vehicle", vehicleSchema);

export default Vehicle;
