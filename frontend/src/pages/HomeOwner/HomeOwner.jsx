import React from 'react';
import {Link} from "react-router-dom"
import "./style.css";
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";


function HomeOwner() {
    const { user } = useContext(AuthContext);
    return (
            <div class="row">
                <div class="navbars col-2">
                    <div class="navbar">
                        <div class="navbar-brand">
                            <Link to={`/manage_room`}>Manage Room</Link>
                        </div>
                    </div>
                </div>
                <div class="col col-9">
                        Column
                </div>
            </div>
    )
}

export default HomeOwner