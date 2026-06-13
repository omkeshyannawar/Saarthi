import React from 'react'
import { useNavigate } from "react-router-dom";


const FeatureCard = (props) => {
  const navigate = useNavigate();

  return (
    <div 
      className="cardContainer"
      onClick={() => navigate(props.route)}>
        <img 
        src={props.src} 
        alt="" 
        className="cardIcon"/>
      <h2 className='cardHeading'>{props.title}</h2>
    </div>
  )
}

export default FeatureCard
