import { useNavigate } from "react-router-dom";

const BackFeature = () => {
    const navigate = useNavigate();
    


  return (
    <div>

      <button className='backBtn' 
        onClick={()=> navigate("/")}>Back</button>
    </div>
  )
}

export default BackFeature
