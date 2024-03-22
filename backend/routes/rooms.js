import express from 'express';
import {createRoom,updateRoom,deleteRoom,getRoom,getAllRoom, getAllRoomByUserId} from '../controllers/roomController.js'
import {verifyToken,verifyHomeOwner, verifyAdmin} from '../utils/verifytoken.js';
import uploadCloud from '../config/Cloudinary.config.js';
const router = express.Router();

//CREATE
router.post("/",uploadCloud.array('imageUrls'),verifyToken,verifyHomeOwner, createRoom);
//UPDATE
router.put("/:id",verifyToken,verifyHomeOwner, updateRoom);
//DELETE
router.delete("/:id",verifyToken,verifyHomeOwner, deleteRoom);
//GET BY ID
router.get("/:id", getRoom);
//GET ALL ROOM
router.get("/", getAllRoom);
//GET ALL ROOM BY USER ID
router.get("/list/:userId",verifyToken,verifyHomeOwner, getAllRoomByUserId);


export default router;