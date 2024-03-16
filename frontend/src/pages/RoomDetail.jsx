import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

function RoomDetail() {
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
        <h1>{roomdata.name}</h1>
        <p>{roomdata.city}</p>
        <p>{roomdata.country}</p>
        <p>{roomdata.description}</p>
        <p>{roomdata.type}</p>
        <p>{roomdata.adultCount}</p>
        <p>{roomdata.childCount}</p>
        <p>{roomdata.facilities}</p>
        <p>{roomdata.pricePerNight}</p>
        <p>{roomdata.starRating}</p>
    </div>
)
}

export default RoomDetail