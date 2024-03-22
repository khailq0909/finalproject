import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

function RoomInfor() {
    const { roomId } = useParams();
    const [roomdata, setRoomdata] = useState();
    useEffect(() => {
        axios.get(`/rooms/${roomId}`)
            .then(data => {
                setRoomdata(data.data);
            })
            .catch(err => console.log(err))
    })

    if (!roomdata) {
        return <></>;
    }
    return (
        <div className="container">

            <h1>room name: {roomdata.name}</h1>
            <p className='fs-3'>room city: {roomdata.city}</p>
            <p className='fs-3'>room address: {roomdata.address}</p>
            <p className='fs-3'>room description: {roomdata.description}</p>
            <p className='fs-3'>room type: {roomdata.type}</p>
            <p className='fs-3'>adult count: {roomdata.adultCount}</p>
            <p className='fs-3'>child count: {roomdata.childCount}</p>
            <p className='fs-3'>facilities: {roomdata.facilities}</p>
            <p className='fs-3'>price per night: {roomdata.pricePerNight}</p>
            <p className='fs-3'>rating: {roomdata.starRating}</p>
            {roomdata.imageUrls.map((image)=>{
                return (
                    <img src={image} alt={image} style={{width: "300px"}}/>
                )
            })}
        </div>
    )
}

export default RoomInfor