import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import * as Toast from "../../components/Toast";


function EditRoom() {
    const navigate = useNavigate();
    const [files, setFiles] = useState("");
    const [credentials, setCredentials] = useState({
    });
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleNewRoom = async (e) => {
        e.preventDefault();
        try {
            const list = await Promise.all(
                Object.values(files).map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "ml_default");
                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/denvpjdpw/image/upload",
                        data
                    );
                    console.log(uploadRes);

                    const { url } = uploadRes.data;
                    const { public_id } = uploadRes.data;
                    return { url: url, public_id: public_id };
                })

            );
            const listUrl = [];
            const listPublicId = []
            list.map(item => {                
                listUrl.push(item.url);
                listPublicId.push(item.public_id);
            })
            const newRoom = {
                ...credentials,
                imageUrls: listUrl,
                fileName: listPublicId

            };
            await axios.post("/rooms", newRoom);
            console.log("add success");
            Toast.toastSuccess("Add room successfully");
            navigate("/manage-room");
        } catch (err) {
            Toast.toastError("Something went wrong");
            console.log(err);
        }
    }

    return (
        <div>
            <div className="container">
                <div className="mb-3">
                    <label for="name" className="form-label">
                        Room Name
                    </label>
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Room Name"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="username" className="form-label">
                        Room Type
                    </label>
                    <input
                        name="type"
                        type="text"
                        className="form-control"
                        id="type"
                        placeholder="Enter Name"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="city" className="form-label">
                        City
                    </label>
                    <input
                        name="city"
                        type="text"
                        className="form-control"
                        id="city"
                        placeholder="Enter city"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="address" className="form-label">
                        Address
                    </label>
                    <input
                        name="address"
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Enter address"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="description" className="form-label">
                        Description
                    </label>
                    <input
                        name="description"
                        type="text"
                        className="form-control"
                        id="description"
                        placeholder="Enter description"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="adultCount" className="form-label">
                        Adult Count
                    </label>
                    <input
                        name="adultCount"
                        type="number"
                        className="form-control"
                        id="adultCount"
                        placeholder="Enter Adults Count"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="childCount" className="form-label">
                        Child Count
                    </label>
                    <input
                        name="childCount"
                        type="number"
                        className="form-control"
                        id="childCount"
                        placeholder="Enter Child Counts"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="facilities" className="form-label">
                        Facilities
                    </label>
                    <input
                        name="facilities"
                        type="text"
                        className="form-control"
                        id="facilities"
                        placeholder="Enter Facility Name"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="pricePerNight" className="form-label">
                        Price Per Night
                    </label>
                    <input
                        name="pricePerNight"
                        type="number"
                        className="form-control"
                        id="pricePerNight"
                        placeholder="Enter Price Per Night"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label for="imageUrls" className="form-label">
                        Image
                    </label>
                    <input
                        name="imageUrls"
                        type="file"
                        className="form-control"
                        id="imageUrls"
                        placeholder="Input Image"
                        accept='image/*'
                        multiple
                        onChange={(e) => setFiles(e.target.files)}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={handleNewRoom}
                >
                    Create account
                </button>
            </div>
        </div>
    )
}

export default EditRoom