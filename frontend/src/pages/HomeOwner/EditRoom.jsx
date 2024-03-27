import React, { useState, useRef } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Toast from "../../components/Toast/Toast";


function EditRoom() {
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [filesData, setFilesData] = useState([]);
    const [imagesData, setImagesData] = useState([]);
    const [credentials, setCredentials] = useState({
    });
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    function selectFiles() {
        fileInputRef.current.click();
    }
    function onFileSelect(e) {
        const files = e.target.files;
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            if (!filesData.some((e) => e.name === files[i].name)) {
                setFilesData((prevImages) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i])
                    }
                ],
                setImagesData(files)
                )
            }
        }
    }
    function deleteImage(index){
        setFilesData((prevImages) => prevImages.filter((image, i) => i!== index));
        setImagesData(Object.values(imagesData).filter((image, i) => i!== index));
    }
    const handleNewRoom = async (e) => {
        e.preventDefault();
        try {
            const list = await Promise.all(
                Object.values(imagesData).map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "ml_default");
                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/denvpjdpw/image/upload",
                        data
                    );
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
                <div class="input-group">
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
                {/* <div className="mb-3">
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
                        onChange={(e) => setFiles(e.target.Data)}
                    />
                </div> */}
                <div className="card">
                    <div className="top">
                        <p>Drag & drop images uploading</p>
                    </div>
                    <div className="drag-area" onClick={selectFiles}>
                        <span >Drop & drag here</span>
                        <input id="imageUrls" type="file" name='imageUrls' className='file'
                            accept='image/*' multiple onChange={onFileSelect} ref={fileInputRef}  />
                    </div>
                    <div className="containers">
                        {
                            filesData.map((image, index) => {
                                return (
                                    <div className="div">
                                        <div className="image" key={index}>
                                            <span className="delete" onClick={()=> deleteImage(index)}>&times;</span>
                                        <img src={image.url} alt={image.name} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="image_preview">

                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={handleNewRoom}
                >
                    Update Room
                </button>
            </div>
        </div>
    )
}

export default EditRoom