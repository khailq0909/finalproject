import './style.css'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
function Header() {
    const { user } = useContext(AuthContext);
    return (
        <div className='header z-1'>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-xl">
                    <Link to="/" className="navbar-brand">myhomestay.com</Link>
                    <div className="d-flex">
                        <Link className='btn btn-hover me-2' to='/support'>Support</Link>
                        <Link className='btn btn-hover me-2' to='/sale_register'>Partnership</Link>


                        {user ? <div className='btn btn-light border border-primary me-2 ' to='/login'>
                            <FontAwesomeIcon icon={faUser} className='pe-2 text-primary'></FontAwesomeIcon>
                            {user.username}</div> : (
                            <><Link className='btn btn-light border border-primary me-2 ' to='/login'>
                                <FontAwesomeIcon icon={faUser} className='pe-2 text-primary'></FontAwesomeIcon>
                                Login</Link><Link className='btn btn-primary p-2' to='/register'>Register</Link></>
                        )}


                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header