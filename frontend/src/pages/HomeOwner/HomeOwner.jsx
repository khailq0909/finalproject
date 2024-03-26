import React from 'react';
import { Link } from "react-router-dom"
import "./style.css";
import { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";


function HomeOwner() {
    const { user } = useContext(AuthContext);
    const [isSelected, setIsSelected] = useState(0);
    return (
        <div className="containe">
            <div class="row">
                <div class="navbars col col-2">
                    <div className="header_left">
                        <div class="cardd">

                            <div class="top-container">

                                <img src="https://i.imgur.com/G1pXs7D.jpg" class="img-fluid profile-image" width="70" />

                                <div class="ml-3">
                                    <h5 class="name">Clarke Jeffery</h5>
                                    <p class="mail">clark@zmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div class="navbar">
                            <div class="navbar-brand">
                                <ul>
                                    <li>
                                        Dash Board
                                    </li>
                                    <li>
                                        <Link className='text-decoration-none text-light' to={`/manage-room`}>Manage Room</Link>
                                    </li>
                                    <li>
                                        Payment
                                    </li>
                                    <li>
                                        Exit
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col col-10">
                    <div className="header_right">
                        This is header
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeOwner