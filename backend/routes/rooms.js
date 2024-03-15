import express from 'express';
import {createRoom,updateRoom,deleteRoom,getRoom,getAllRoom} from '../controllers/roomController.js'
import {verifyToken,verifyHomeOwner, verifyAdmin} from '../utils/verifytoken.js';
const router = express.Router();

//CREATE
router.post("/",verifyToken,verifyHomeOwner, createRoom);
//UPDATE
router.put("/:id",verifyToken,verifyHomeOwner, updateRoom);
//DELETE
router.delete("/:id",verifyToken,verifyHomeOwner, deleteRoom);
//GET BY ID
router.get("/:id", getRoom);
//GET ALL ROOM
router.get("/", getAllRoom);


export default router;