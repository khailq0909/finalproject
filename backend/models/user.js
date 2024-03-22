import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
{
    email: { type: String, required: true, unique: true },
    username: {type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true, unique: true},
    lastname : { type: String, required: true, unique: true },
    birthday:{ type: String, required: true},
    gender: { type: String},
    img: { type: String },
    city: { type: String, required: true},
    phone: { type: Number, required: true },
    avatar: { type: String},
    isAdmin: { type: Boolean, default: false },
    isHomeOwner: { type: Boolean, default: false },
},{ timestamps: true }
);

export default mongoose.model("User", UserSchema);