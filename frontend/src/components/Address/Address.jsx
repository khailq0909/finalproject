import axios from 'axios';
import React, { memo,useState, useRef, useEffect, d} from 'react';

import Select from '../../form/Select/Select';
function Address({setPayload, data}) {
    console.log('address', data)
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);
    const [ward, setWard] = useState(null);
    const [homeNumber, setHomeNumber] = useState("");
    const [reset,setReset] = useState(false);

    // useEffect(()=>{
    //     let addressArr = data?.address?.split(",")
    //             let foundProvince = provinces.length > 0 && provinces?.find(item => item.province_name === addressArr[addressArr.length -1]?.trim())
    //             setProvince(foundProvince ? foundProvince.province_id : '')
    // },[data]);  

    // useEffect(()=>{
    //     let addressArr = data?.address?.split(",")
    //             let foundDistrict = districts.length > 0 && districts?.find(item => item.district_name === addressArr[addressArr.length -2]?.trim())
    //             setDistrict(foundDistrict ? foundDistrict.district_id : '')
    // },[data,districts]); 

    // useEffect(()=>{
    //     let addressArr = data?.address?.split(",")
    //             let foundWard = wards.length > 0 && wards?.find(item => item.ward_name === addressArr[addressArr.length -3]?.trim())
    //             setWard(foundWard ? foundWard.ward_id : '')
    // },[data, wards]) 

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

    useEffect(()=>{
        setPayload({
            address: `${homeNumber ? `${homeNumber},` : ''} ${ward ? `${wards?.find(item => item.ward_id === ward)?.ward_name},` : ''} ${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? `${provinces?.find(item => item.province_id === province)?.province_name}` : ''} `,
            city: `${province ? `${provinces?.find(item => item.province_id === province)?.province_name}` : ''}`

        })
    },[province,district,ward])
  return (
    <div className='select-address'>
    <div className="select-area d-flex justify-content-between">
        <Select  type="province" value={province} setValue={setProvince} options={provinces} label={"City"} />
        <Select  reset={reset} type="district" value={district} setValue={setDistrict} options={districts} label={"District"} />
        <Select  reset={reset} type="ward" value={ward} setValue={setWard} options={wards} label={"Ward"} />

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
  )
}

export default memo(Address)