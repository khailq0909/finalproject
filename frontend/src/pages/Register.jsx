import React from 'react'
import slide1 from "../assets/images/slide1.jpg";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: undefined,
        username: undefined,
        password: undefined,
        firstname: undefined,
        lastname: undefined,
        phone: undefined,
    });

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/register", credentials);
            const data = res.data;
            console.log(data);
            navigate("/login");
        } catch (err) {
            console.log("Error " + err.response.data);
        }
    };

    return (
        <section class="p-3 p-md-4 p-xl-5 ">
            <div class="container">
                <div class="card border-light-subtle shadow-sm" style={{ borderRadius: "1rem" }}>
                    <div class="row g-0">
                        <div class="col-12 col-md-6">
                            <img class="img-fluid w-100 h-100 object-fit-cover" loading="lazy" src={slide1} style={{ borderRadius: "1rem 0 0 1rem" }} alt="BootstrapBrain Logo" />
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="card-body p-3 p-md-4 p-xl-5">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="mb-5">
                                            <h2 class="h1 fw-bold mb-0">Registration</h2>
                                            <h3 class="fs-6 fw-normal text-secondary m-0">Enter your details to register</h3>
                                        </div>
                                    </div>
                                </div>
                                <form action="#!">
                                    <div class="row gy-3 gy-md-4 overflow-hidden">
                                        <div class="col-6">
                                            <label for="firstname" class="form-label">First Name <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="firstname" placeholder="First Name" onChange={handleChange} required />
                                        </div>
                                        <div class="col-6   ">
                                            <label for="lastname" class="form-label">Last Name <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control"  id="lastname" placeholder="Last Name" onChange={handleChange} required />
                                        </div>
                                        <div class="col-12">
                                            <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                                            <input type="email" class="form-control" id="email" placeholder="name@example.com" onChange={handleChange} required />
                                        </div>
                                        <div class="col-6">
                                            <label for="username" class="form-label">Username <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control"  id="username" placeholder='Username' onChange={handleChange} required />
                                        </div>
                                        <div class="col-6">
                                            <label for="password" class="form-label">Password <span class="text-danger">*</span></label>
                                            <input type="password" class="form-control"  id="password" placeholder='Password' onChange={handleChange} equired />
                                        </div>
                                        <div class="col-12">
                                            <label for="phone" class="form-label">Phone <span class="text-danger">*</span></label>
                                            <input type="tel" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxLength="12" class="form-control" name="phone" id="phone" placeholder='Number Phone' onChange={handleChange} required />
                                        </div>
                                        {/* <div class="col-12">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" name="iAgree" id="iAgree" required/>
                                                    <label class="form-check-label text-secondary" for="iAgree">
                                                        I agree to the <a href="#!" class="link-primary text-decoration-none">terms and conditions</a>
                                                    </label>
                                            </div>
                                        </div> */}
                                        <div class="col-12">
                                            <div class="d-grid">
                                                <button class="btn bsb-btn-xl btn-primary" type="submit" onClick={handleClick}>Sign up</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div class="row">
                                    <div class="col-12">
                                        <hr class="mt-5 mb-4 border-secondary-subtle" />
                                        <p class="m-0 text-center" style={{ color: "#393f81" }}  >Already have an account? <Link to={'/login'} className='text-primary'>Sign in</Link></p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register