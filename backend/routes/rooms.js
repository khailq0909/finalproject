import express from 'express';
import {createRoom,updateRoom,deleteRoom,getRoom,getAllRoom} from '../controllers/roomController.js'
const router = express.Router();

//CREATE
router.post("/", createRoom);
//UPDATE
router.put("/:id", updateRoom);
//DELETE
router.delete("/:id", deleteRoom);
//GET BY ID
router.get("/:id", getRoom);
//GET ALL ROOM
router.get("/", getAllRoom);


export default router;