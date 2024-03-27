import React, { useEffect, useState, useContext } from 'react';
import { useQuery } from 'react-query'
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import noData from "../../assets/images/noData.png";
import * as Toast from "../../components/Toast/Toast";

function ManageRoom() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [roomData, setRoomData] = useState([])
  useEffect(()=>{
    axios.get(`/rooms/list/${user._id}`)
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
        setTimeout(()=>{
          window.location.reload();
        },3000)
      }
    } catch (err) {
      Toast.toastError("Something went wrong");
      console.log(err);
    }
  }
  console.log(roomData)
  return (
    <>
    <div className="manage_room container">
      <div className="manage_header d-flex justify-content-center align-items-center mt-3 me-2">
        <h2>Manage Room</h2>
      </div>
      <div className="line"></div>
    {roomData.length !== 0  ?     <div className=''>
      <div className="topic_table">
        <table className="table align-middle mb-0 bg-white table-bordered mt-5">
          <thead className="bg-light ">
            <tr>
              <th className='fs-6 text'>No</th>
              <th className='fs-6 text'>Room Name</th>
              <th className='fs-6 text'>Type</th>
              <th className='fs-6 text'>Address</th>
              <th className='fs-6 text'>City</th>
              <th className='fs-6 text'>Adult Count</th>
              <th className='fs-6 text'>Child Count</th>
              <th className='fs-6 text'>Price/ Night</th>
              <th className='fs-6 text'>Last Updated</th>
              <th className='fs-6 text'>Action</th>

            </tr>
          </thead>
          {
            roomData.map((item, index) => {
              return (
                <tbody  key={index}>
                  <tr >
                    <td>{index + 1}</td>
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
      </div>
    </div>: <div className='container d-flex justify-content-center mt-5'>
          <img className='w-50' src={noData} alt="noData" />
      </div>}

    </div>

    </>
  )
}

export default ManageRoom