import Room from '../models/room.js';
import {createError} from '../utils/error.js';

export const createRoom = async (req, res, next) =>{
    const newRoom = new Room(req.body);

    newRoom.lastUpdated = new Date();
    newRoom.userId = req.userId;
    console.log(newRoom.userId);
    try{
        const saveRoom = await newRoom.save();
        res.status(200).json(saveRoom);

    }catch(err){
        return next(createError("500", "Something went wrong"));
    }
}

export const updateRoom = async (req, res, next) =>{
    try{
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true});
        res.status(200).json(updateRoom);

    }catch(err){
        return next(createError("500", "Something went wrong"));
    }
}

export const deleteRoom = async (req, res, next) =>{
    try{
        await Room.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Room has been deleted"});

    }catch(err){
        return next(createError("500", "Something went wrong"));
    }
}

export const getRoom = async (req, res, next) =>{
    try{
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);

    }catch(err){
        return next(createError("500", "Something went wrong"));
    }
}

export const getAllRoom = async (req, res, next) =>{
    try{
        const rooms = await Room.find();
        res.status(200).json(rooms);

    }catch(err){
        return next(createError("500", "Something went wrong"));
    }
}