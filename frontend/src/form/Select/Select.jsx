import React, { memo, useEffect } from 'react'
import axios from 'axios';

function Select({ label,options, value, setValue,type, reset }) {



  return (
    <div className="d-flex flex-column mb-3 justify-content-between w-100 ps-2 pe-2">
      <label htmlFor="address-seleect">{label}</label>
      <select value={reset ? '':value} onChange={(e) => setValue(e.target.value)} id="address-seleect" className='select p-2 rounded-1 border-1'>
        <option value="">{`--Select ${label}--`}</option>
        {
          options?.map(item => {
            return(
              <option
              key={type === "province" ?  item?.province_id : type === "district" ? item?.district_id : item?.ward_id } 
              value={type === "province" ?  item?.province_id : type === "district" ? item?.district_id : item?.ward_id}>
                {type === "province" ?  item?.province_name : type === "district" ? item?.district_name : item?.ward_name}
              </option>
            )
          })
        }
      </select>
    </div>
  )
}

export default memo(Select)