import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  userId: { type: String},
  name: { type: String, required: true },
  type: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  facilities: [{ type: String, required: true }],
  pricePerNight: { type: Number, required: true },
  starRating: { type: Number, min: 1, max: 5 },
  imageUrls: [{ type: String }],
  fileName: [{ type: String}],
  lastUpdated: { type: Date},
  bookings: {type: String},
});

const User = mongoose.model("Room", roomSchema);

export default User;
