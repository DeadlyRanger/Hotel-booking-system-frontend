import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendcontext } from "../context/ApiContext";

const Hotels = () => {
  const [details, setDetails] = useState([]);
  let navigate = useNavigate();

  let {serverurl,setUserrole,userrole} = useContext(backendcontext);
  const fetchDetails = async () => {
    try {
      const res = await axios.get(
        `${serverurl}/api/listings/allhotels`
      );

      setDetails(res.data.Listing || res.data.listing || []);
    } catch (err) {
      console.error("API ERROR ❌", err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Available Hotels 🏨
      </h1>

      {details.length === 0 ? (
        <p className="text-center text-gray-500">No hotels found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {details.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <div className="h-52 w-full overflow-hidden">
                <img
                  src={item.Image}
                  alt={item.Title}
                  className="h-full w-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5 space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.Title}
                </h2>

                <p className="text-sm text-gray-500">
                  📍 {item.City}
                </p>

                <p className="text-lg font-bold text-indigo-600">
                  ₹ {item.price} / night
                </p>

                <button 
                  onClick={()=>navigate(`hotel/${item._id}`)}
                className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                  View Details
                   
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hotels;
