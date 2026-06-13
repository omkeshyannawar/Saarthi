import Carousel from '../components/Carousel';
import React from 'react'
import WeatherCard from "../components/WeatherCard";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



const Dashboard = () => {
  return (
    <>
    <Navbar/>
    <div className="dashboardPage">
      <WeatherCard />
     </div>
     <Carousel/>
     <Footer/>
     
    </>
  )
}

export default Dashboard



