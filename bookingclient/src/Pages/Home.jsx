import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Featured from '../components/Featured'
import './Home.css'
import PropertyList from '../components/PropertyList'
import FeaturedProperties from '../components/FeaturedProperties'
import EmailList from '../components/EmailList'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <EmailList />
        <Footer/>
      </div>
    </div>
  )
}

export default Home