import React, { useEffect, useState, useContext } from 'react';
import { useQuery } from 'react-query'
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import * as Toast from "../../components/Toast";

function ManageRoom() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [roomData, setRoomData] = useState([])
  useEffect(()=>{
    axios.get(`rooms/list/${user._id}`)
    .then((data) =>{
      setRoomData(data.data);
    })
    .catch((err) =>{
      console.log(err);
    })
  },[])

  if (roomData == null) <></>

  function handleClickDelete(id) {
    const conf = window.confirm("Are you sure you want to delete?");

    try {
      if (conf) {
         axios.delete(`/rooms/${id}`); 
        console.log("delete successfully")
        Toast.toastSuccess("Deleted");
      }
      navigate("/manage-room");
    } catch (err) {
      Toast.toastError("Something went wrong");
      console.log(err);
    }
  }
  return (
    <div className='container'>
      <div className="topic_table">
        <table className="table align-middle mb-0 bg-white table-bordered mt-5">
          <thead className="bg-light ">
            <tr>
              <th>No</th>
              <th>Room Name</th>
              <th>Type</th>
              <th>Address</th>
              <th>City</th>
              <th>Adult Count</th>
              <th>Child Count</th>
              <th>Price/ Night</th>
              <th>Last Updated</th>
              <th>Action</th>

            </tr>
          </thead>
          {
            roomData.map((item, index) => {
              return (
                <tbody  key={index}>
                  <tr >
                    <td>{index}</td>
                    <td className='topic_tile'>
                      <div className="d-flex align-items-center">
                        {item.name}
                      </div>
                    </td>
                    <td className='topic_startdate'>
                      <div className="d-flex align-items-center">
                        {item.type}
                      </div>
                    </td>
                    <td className='topic_enddate'>
                      <div className="d-flex align-items-center">
                        {item.address}
                      </div>
                    </td>
                    <td className='topic_description'>
                      <div className="d-flex align-items-center">
                        {item.city}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        {item.adultCount}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        {item.childCount}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        {item.pricePerNight}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        {item.lastUpdated}
                      </div>
                    </td>

                    <td className='topic_action'>
                      <button type="button" className="btn btn-success btn-sm btn-rounded" >
                        Edit
                      </button>
                      <button type="button" className="btn btn-danger btn-sm btn-rounded" onClick={e => handleClickDelete(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              )
            })
          }
        </table>
        <div className="btn btn-success m-2">
          <Link to={"/manage-room/add"}>
          Add new Room
          </Link>
        </div>
      </div>

    </div>
  )
}

export default ManageRoom