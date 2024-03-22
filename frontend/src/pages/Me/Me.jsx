import React, { useState } from 'react'
import "./style.css"
import axios from 'axios';
import { useContext } from 'react';
import { useQuery } from 'react-query'
import { AuthContext } from "../../context/AuthContext";
import Header from '../../components/Header/Header';

function Me() {
    const { user } = useContext(AuthContext);
    // const [userData, setUserData] = useState();

    const { data, error, isError, isLoading } = useQuery(['user'], getUser)
    if (isLoading) {
        return <span>Đang tải...</span>
    }

    if (isError) {
        return <span>Have an errors: {error.message}</span>
    }
    async function getUser() {
        const response = await axios.get(`users/${user._id}`);
        return response.data;
    }

    if (data == null) return <> </>



    return (
        <div className="profile">
            <Header />
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="my-5">
                            <h3>My Profile</h3>
                            <hr />
                        </div>
                        <form class="file-upload">
                            <div class="row">
                                <div class="col col-8 mb-xxl-0">
                                    <div class="bg-secondary-soft px-4 py-5 rounded">
                                        <div class="row g-3">
                                            <h4 class="mb-4 mt-0">Contact detail</h4>
                                            <div class="col-md-6">
                                                <label class="form-label">First Name *</label>
                                                <input type="text" class="form-control" placeholder={data.firstname} aria-label="First name" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Last Name *</label>
                                                <input type="text" class="form-control" placeholder={data.lastname} aria-label="Last name" />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Birth Day</label>
                                                <input type="text" class="form-control" value={data.birthday} aria-label="Birth Day" />
                                            </div>
                                            <div class="col-md-6">
                                                <label for="inputEmail4" class="form-label">Gender *</label>
                                                <input type="text" class="form-control" id="gender" value={data.gender} />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">Phone *</label>
                                                <input type="number" class="form-control" placeholder="" aria-label="Phone Number" value={data.phone} />
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label">City</label>
                                                <input type="text" class="form-control" placeholder={data.city} aria-label="Class" />
                                            </div>
                                        </div>
                                    </div>



                                    <div class="bg-secondary-soft mt-3 px-4 py-5 rounded">
                                        <div class="row g-3">
                                            <h4 class="my-4">Change Password</h4>

                                            <div class="col-md-6">
                                                <label htmlFor="exampleInputPassword1" class="form-label">Old password *</label>
                                                <input type="password" class="form-control" id="exampleInputPassword1" />
                                            </div>

                                            <div class="col-md-6">
                                                <label htmlFor="exampleInputPassword2" class="form-label">New password *</label>
                                                <input type="password" class="form-control" id="exampleInputPassword2" />
                                            </div>

                                            <div class="col-md-12">
                                                <label htmlFor="exampleInputPassword3" class="form-label">Confirm Password *</label>
                                                <input type="password" class="form-control" id="exampleInputPassword3" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-4">
                                    <div class="bg-secondary-soft px-4 py-5 rounded">
                                        <div class="row g-3">
                                            <h4 class="mb-4 mt-0">Upload your profile photo</h4>
                                            <div class="text-center">
                                                <div class="square position-relative display-2 mb-3" >
                                                    <img class="fas w-100 h-100 fa-fw fa-user position-absolute top-50 start-50 translate-middle text-secondary" src={data.avatar} alt=""/>
                                                </div>
                                                <input type="file" id="customFile" name="file" />
                                                <label class="btn btn-success-soft btn-block" htmlFor="customFile">Upload</label>
                                                <button type="button" class="btn btn-danger-soft">Remove</button>
                                                <p class="text-muted mt-3 mb-0"><span class="me-1">Note:</span>Minimum size 300px x 300px</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div>

    )
}

export default Me