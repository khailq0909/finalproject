import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Toast from "../../components/Toast/Toast";
import Select from '../../form/Select/Select';

function EditRoom({ dataEdit }) {
    console.log("data", dataEdit.imageUrls)
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);
    const [ward, setWard] = useState(null);
    const [homeNumber, setHomeNumber] = useState("");
    const [reset, setReset] = useState(false);
    const fileInputRef = useRef(null);
    const [imagePrev, setimagePrev] = useState([]);
    const [imageBefore, setimageBefore] = useState([]);
    const [imagesData, setImagesData] = useState([]);
    const [credentials, setCredentials] = useState({
    });
    const [payload, setPayload] = useState({
        address: '',
        city: '',
    });

    useEffect(() => {
        if (dataEdit) {
            setimageBefore(dataEdit?.imageUrls)
        }
    }, [dataEdit])

    console.log("fileData", imageBefore)
    useEffect(() => {
        let addressArr = dataEdit?.address?.split(",")
        let foundProvince = provinces.length > 0 && provinces?.find(item => item.province_name === addressArr[addressArr.length - 1]?.trim())
        setProvince(foundProvince ? foundProvince.province_id : '')
    }, [dataEdit]);

    useEffect(() => {
        let addressArr = dataEdit?.address?.split(",")
        let foundDistrict = districts.length > 0 && districts?.find(item => item.district_name === addressArr[addressArr.length - 2]?.trim())
        setDistrict(foundDistrict ? foundDistrict.district_id : '')
    }, [dataEdit, districts]);

    useEffect(() => {
        let addressArr = dataEdit?.address?.split(",")
        let foundWard = wards.length > 0 && wards?.find(item => item.ward_name === addressArr[addressArr.length - 3]?.trim())
        setWard(foundWard ? foundWard.ward_id : '')
    }, [dataEdit, wards])

    useEffect(() => {
        // setProvince(null);
        const getPublicProvinces = async () => {
            const res = await axios.get("https://vapi.vnappmob.com/api/province/");
            if (res.status === 200) {
                setProvinces(res?.data.results);
            }
        }
        getPublicProvinces();
    }, [])

    useEffect(() => {
        setDistrict(null)
        const getPublicDistrict = async (provinceId) => {
            console.log(provinceId)
            const res = await axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`);
            if (res.status === 200) {
                setDistricts(res?.data.results);
            }
        }
        province && getPublicDistrict(province);
        !province ? setReset(true) : setReset(false);
        !province && setDistricts([])
    }, [province])

    useEffect(() => {
        setWard(null)
        const getPublicWard = async (districtId) => {
            const res = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`);
            if (res.status === 200) {
                setWards(res?.data.results);
            }
        }
        district && getPublicWard(district);
        !district ? setReset(true) : setReset(false);
        !district && setWards([])
    }, [district])

    useEffect(() => {
        setPayload({
            address: `${homeNumber ? `${homeNumber},` : ''} ${ward ? `${wards?.find(item => item.ward_id === ward)?.ward_name},` : ''} ${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? `${provinces?.find(item => item.province_id === province)?.province_name}` : ''} `,
            city: `${province ? `${provinces?.find(item => item.province_id === province)?.province_name}` : ''}`

        })
    }, [province, district, ward])
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
            if (!imagePrev.some((e) => e.name === files[i].name)) {
                setimagePrev((prevImages) => [
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
    function deleteImage(index) {
        setimagePrev((prevImages) => prevImages.filter((image, i) => i !== index));
        setImagesData(Object.values(imagesData).filter((image, i) => i !== index));
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
                ...payload,
                imageUrls: listUrl,
                fileName: listPublicId

            };
            await axios.post("/rooms", newRoom);
            Toast.toastSuccess("Add room successfully");
            setTimeout(() => {
                window.location.reload();
            }, 3000)
        } catch (err) {
            Toast.toastError("Something went wrong");
            console.log(err);
        }
    }

    return (
        <div className="modal fade"
            id="createAccount"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Edit Room
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label for="name" className="form-label">
                                Room Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder={dataEdit.name}
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
                                placeholder={dataEdit.type}
                                onChange={handleChange}
                            />
                        </div>
                        {/* <Address setPayload={setPayload} data={dataEdit} /> */}
                        <div className='select-address'>
                            <div className="select-area d-flex justify-content-between">
                                <Select type="province" value={province} setValue={setProvince} options={provinces} label={"City"} />
                                <Select reset={reset} type="district" value={district} setValue={setDistrict} options={districts} label={"District"} />
                                <Select reset={reset} type="ward" value={ward} setValue={setWard} options={wards} label={"Ward"} />

                            </div>
                            <div className="detail_address w-100">
                                <span>Detail Address</span>
                                <input type="text" name="homeNumber" id="homNumber" placeholder='Detail Adress' className='form-control mb-3' onChange={(e) => setHomeNumber(e.target.value)} />
                            </div>
                            <div className="d-flex">
                                <div className="mb-3 w-75 me-2">
                                    <label for="address" className="form-label">
                                        Address
                                    </label>
                                    <input
                                        name="address"
                                        type="text"
                                        className="form-control"
                                        value={`${homeNumber ? `${homeNumber},` : ''} ${ward ? `${wards?.find(item => item.ward_id === ward)?.ward_name},` : ''} ${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? `${provinces?.find(item => item.province_id === province)?.province_name}` : ''} `}
                                        placeholder="Enter address"

                                    />
                                </div>
                                <div className="mb-3 w-25">
                                    <label for="city" className="form-label">
                                        City
                                    </label>
                                    <input
                                        name="city"
                                        type="text"
                                        className="form-control"
                                        value={`${province ? `${provinces?.find(item => item.province_id === province)?.province_name}` : ''}`}
                                        placeholder="Enter city"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="input-group  d-flex flex-nowrap justify-content-between">
                            <div className="mb-3 me-2 w-50">
                                <label for="adultCount" className="form-label">
                                    Adult Count
                                </label>
                                <input
                                    name="adultCount"
                                    type="number"
                                    className="form-control"
                                    id="adultCount"
                                    min={0}
                                    max={10}
                                    placeholder={dataEdit.adultCount}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3 ms-2 w-50">
                                <label for="childCount" className="form-label">
                                    Child Count
                                </label>
                                <input
                                    name="childCount"
                                    min={0}
                                    max={10}
                                    type="number"
                                    className="form-control"
                                    id="childCount"
                                    placeholder={dataEdit.childCount}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label for="pricePerNight" className="form-label">
                                Price Per Night
                            </label>
                            <input
                                name="pricePerNight"
                                type="number"
                                inputmode="decimal"
                                className="form-control"
                                id="pricePerNight"
                                min={0}
                                max={9999}
                                placeholder={dataEdit.pricePerNight}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label for="description" className="form-label">
                                Description
                            </label>
                            <textarea
                                name="description"
                                type="text"
                                className="form-control pt-1"
                                id="description"
                                placeholder={dataEdit.description}
                                rows="15"
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
                                placeholder={dataEdit.facilities}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="cards mb-3 w-100">
                            <div className="top">
                                <p>Drag & drop images uploading</p>
                            </div>
                            <div className="drag-area" onClick={selectFiles}>
                                <span >Drop & drag here</span>
                                <input id="imageUrls" type="file" name='imageUrls' className='file'
                                    accept='image/*' multiple onChange={onFileSelect} ref={fileInputRef} />
                            </div>
                            <div className="containers">
                                {
                                    imagePrev.map((image, index) => {
                                        return (
                                            <div className="div">
                                                <div className="image" key={index}>
                                                    <span className="delete" onClick={() => deleteImage(index)}>&times;</span>
                                                    <img src={image.url} alt={image.name} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {
                                    imageBefore.map((item, index) => {
                                        return (
                                            <div className="div">
                                                <div className="image" key={index}>
                                                    <span className="delete" onClick={() => deleteImage(index)}>&times;</span>
                                                    <img src={item} alt="" />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {/* <div className="image_preview">

                        </div> */}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
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
            </div>
        </div>
    )
}

export default EditRoom