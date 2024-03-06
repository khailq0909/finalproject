import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    name:{type:String, require: true},
    type:{type:String, require: true},
    city:{type:String, require: true},
    address:{type:String, require: true},
    distance:{type:String, require: true},
    photos:{type:[String], require: true},
    desc:{type:String, require: true},
    rate:{type:Number, min: 0, max: 5},
    pricepernight:{type:Number, require: true},
    featured:{type:Boolean, default:false},
})

const User = mongoose.model("Room", roomSchema);

export default User;