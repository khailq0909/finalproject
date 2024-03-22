import Room from '../models/room.js';
import {createError} from '../utils/error.js';
import {v2 as cloudinary} from "cloudinary";

export const createRoom = async (req, res, next) =>{
    const images = req.files;
    const newRoom = new Room(req.body);

    newRoom.lastUpdated = new Date();
    // newRoom.imageUrls = images.map((image) => image?.path);
    // newRoom.fileName = images.map((image) => image?.filename);
    newRoom.userId = req.userId;
    // console.log(newRoom.userId);
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
        const roomId = req.params.id;
        const room = await Room.findById(roomId);
        const imageFilenames = room.fileName;
        imageFilenames.map((filename) =>{
            cloudinary.uploader.destroy(filename, (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result);
                }
            })
        })
        await Room.findByIdAndDelete(roomId);
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

export const getAllRoomByUserId = async (req, res, next) =>{
    try{
        const userId = String(req.userId);
        const rooms = await Room.find();
        const listRoom = [];
        console.log("user id",userId);
        rooms.map((room) =>{
            if(room.userId === userId){
                listRoom.push(room);
                
            }
        })
        res.status(200).json(listRoom);
        console.log(listRoom);

    }catch(err){
        return next(createError("500", "Something went wrong"));
    }
}