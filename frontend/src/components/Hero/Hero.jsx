import React from 'react'
import slide1 from '../../assets/images/slide1.jpg'
import './style.css'
function Hero() {
    return (
    <div className='hero position-relative'>
        <img src={slide1} alt="hero_image" className='hero_image' loading='eager' />
        <p className='hero_title'>Find your best place for your trip</p>
        <button className='btn btn-lignt border-primary hero_btn'>book now</button>
    </div>
    )
}

export default Hero