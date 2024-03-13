import React from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import Search from '../components/Search/Search'
import Container from '../components/Container/Container'
function home() {
  return (
    <div className=''>
        <Header/>
        <Hero/>
        <Search/>
        <Container/>
    </div>
  )
}

export default home