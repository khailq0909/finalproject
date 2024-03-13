import React from 'react';
import './style.css';
import Range from 'react-slider';
import { useState } from 'react';
import slide1 from '../../assets/images/slide1.jpg'
import slide2 from '../../assets/images/slide2.jpeg'

const MIN = 0;
const MAX = 1500;

function Container() {
  const [values, setValues] = useState([MIN, MAX])

  return (
    <div className="container mt-5" id="container">
      <div className="row">
        <div className="filter col col-4">
          <div className="filter_price">
            <p>Price <span>Range</span></p>
            <small className=''>Current Range: ${values[1] - values[0]}</small>
            <div className={"values price_range mt-3"}>
              <span className='me-2'>${values[0]}</span><Range className={'range'}
                value={values}
                min={MIN}
                max={MAX}
                onChange={setValues} /> <span className='ms-2'>${values[1]}</span>

            </div>
          </div>

        </div>
        <div className="content col col-8">
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img src={slide2} class="img-fluid rounded-start" alt="..."/>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div className="card_footer">
                      <div className='location'>123 Hai Ba Trung, Ha Noi, Viet Nam</div>
                      <div className="btn btn-danger">Select Room</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img src={slide2} class="img-fluid rounded-start" alt="..."/>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div className="card_footer">
                      <div className='location'>123 Hai Ba Trung, Ha Noi, Viet Nam</div>
                      <div className="btn btn-danger">Select Room</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img src={slide2} class="img-fluid rounded-start" alt="..."/>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div className="card_footer">
                      <div className='location'>123 Hai Ba Trung, Ha Noi, Viet Nam</div>
                      <div className="btn btn-danger">Select Room</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img src={slide2} class="img-fluid rounded-start" alt="..."/>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div className="card_footer">
                      <div className='location'>123 Hai Ba Trung, Ha Noi, Viet Nam</div>
                      <div className="btn btn-danger">Select Room</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Container