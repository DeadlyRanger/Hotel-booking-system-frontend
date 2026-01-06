import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyListings = () => {
  const [details, setDetails] = useState([]);
 const navigate = useNavigate();
  const deleteHotel = async(id)=>{
     try{
       await axios.delete(`http://localhost:3000/api/listings/hotels/${id}`,{withCredentials:true});
       fetchDetails();
     }
     catch(err){
       console.log(err);
     }
  }
  const fetchDetails = async () => {
    try {
      const hotels = await axios.get(
        "http://localhost:3000/api/listings/managehotels",
        { withCredentials: true }
      );

      setDetails(hotels.data.hotels);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
          My Listings
        </h1>

        {details.length === 0 ? (
          <p className="text-gray-500">
            No hotels added yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {details.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={item.Image}
                  alt={item.Title}
                  className="h-48 w-full object-cover"
                />

                <div className="p-4 space-y-2">
                  <h2 className="text-lg font-semibold">
                    {item.Title}
                  </h2>

                  <p className="text-sm text-gray-500">
                    📍 {item.City}
                  </p>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.Description}
                  </p>

                  <p className="font-semibold text-indigo-600">
                    ₹ {item.price} / night
                  </p>

                  {/* ACTION BUTTONS */}
                  <div className="flex gap-3 mt-4">
                    <button onClick={()=> navigate(`/admin/edithotel/${item._id}`)}
                      className="flex-1 border border-indigo-600 text-indigo-600 py-1.5 rounded hover:bg-indigo-600 hover:text-white transition"
                    >
                      Edit
                    </button>

                    <button
                    onClick={()=>deleteHotel(item._id)}
                      className="flex-1 border border-red-500 text-red-500 py-1.5 rounded hover:bg-red-500 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyListings;
