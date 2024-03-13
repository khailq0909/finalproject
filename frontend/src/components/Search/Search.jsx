import React from 'react'
import './style.css'
function Search() {

    return (
        <div className='search container '>
            <div className="row align-items-center">
                <div className="col mt-3">
                
                <div className="input-group mb-3">
                    <select className="form-select" id="inputGroupSelect01">
                        <option selected>Destination</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                </div>      
                <div className="col mt-3">
                    <div className="input-group mb-3">
                        <select className="form-select" id="inputGroupSelect01">
                            <option selected>Check-in time</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>
                <div className="col mt-3">
                    
                    <div className="input-group mb-3">
                        <select className="form-select" id="inputGroupSelect01">
                            <option selected>Guest and Room</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>
                <div className="col searchbtn">
                    <div className="btn btn-danger input-group col">Search room</div>
                </div>
            </div>

        </div>

    )
}

export default Search