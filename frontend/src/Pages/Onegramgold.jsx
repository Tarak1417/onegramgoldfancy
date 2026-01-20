import react from "react";
import Navbar from "../Components/Navbar";
import Catogery from "../Pages/CategoryChips";
import { useNavigate } from "react-router-dom";


const Onegramgold = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar/>

<div  className='pt-[70px]'>
     <div className="max-w-md mx-auto mb-4 flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center  text-yellow-400 hover:text-yellow-500 transition"
        >
          {/* Back Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>
    <Catogery/>


            <h1>
                
                onegram gold teskondi
            </h1>
            </div>
        </div>
    )
}

export default Onegramgold;