import React from 'react'

import Header from "../components/Header/Header"
import Search from "../form/Search/Search"
import RoomInfor from '../form/RoomDetailInfor/RoomInfor'

function RoomDetail() {
  
  return (
    <div className="room">
      <Header /> 
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container">
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="!#">Overview</a>
                <a class="nav-link active" aria-current="page" href="!#">Rooms</a>
                <a class="nav-link active" aria-current="page" href="!#">Location</a>
                <a class="nav-link active" aria-current="page" href="!#">Facilities</a>
                <a class="nav-link active" aria-current="page" href="!#">Policy</a>
                <a class="nav-link active" aria-current="page" href="!#">Review</a>
              </div>
            </div>
            <div className="d-flex">
              <a class="nav-link active" aria-current="page" href="!#">Back to top</a>
            </div>
          </div>
        </nav>

        <RoomInfor/>
      
    </div>

  )
}

export default RoomDetail