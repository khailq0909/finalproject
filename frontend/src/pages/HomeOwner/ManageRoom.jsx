import React, { useEffect, useState, useContext } from 'react';
import { useQuery } from 'react-query'
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import AddRoom from './AddRoom';

function ManageRoom() {
  const { user } = useContext(AuthContext);
  // const [roomData, setRoomData] = useState([])

  const { data, error, isError, isLoading } = useQuery(['listrooms'], getListRoom)
  if (isLoading) {
    return <span>Đang tải...</span>
  }

  if (isError) {
    return <span>Have an errors: {error.message}</span>
  }
  async function getListRoom() {
    const response = await axios.get(`rooms/list/${user._id}`);
    return response.data;
  }
  if (data == null) <></>

  function handleClickDelete(id) {
    const conf = window.confirm("Are you sure you want to delete?");

    try {
      if (conf) {
        const res = axios.delete(`/rooms/${id}`);
        console.log(res);
      }

    } catch (err) {
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
            data.map((item, index) => {
              return (
                <tbody>
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
        <div className="btn btn-success m-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
          {" "}
          Add new Room
        </div>
      </div>

      <AddRoom />

    </div>
  )
}

export default ManageRoom