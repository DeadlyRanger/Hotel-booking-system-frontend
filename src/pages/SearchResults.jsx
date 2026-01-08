import React from "react";
import { useLocation, Link } from "react-router-dom";

const SearchResults = () => {
  const { state } = useLocation();

  if (!state || !state.hotels) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          No search results found
        </h2>
        <p className="text-gray-500 mt-2">
          Try searching for a different city
        </p>
        <Link
          to="/"
          className="mt-4 inline-block text-indigo-600 font-medium underline"
        >
          Go back to home
        </Link>
      </div>
    );
  }

  const { hotels, city } = state;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Hotels in{" "}
          <span className="text-indigo-600 capitalize">{city}</span>
        </h2>
        <p className="text-gray-500 mt-1">
          {hotels.length} hotel{hotels.length !== 1 && "s"} found
        </p>
      </div>

      {/* NO HOTELS */}
      {hotels.length === 0 ? (
        <div className="text-center text-gray-500">
          No hotels available in this city.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* IMAGE */}
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={hotel.Image}
                  alt={hotel.Title}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {hotel.Title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {hotel.Address}, {hotel.City}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <p className="text-indigo-600 font-bold text-lg">
                    ₹{hotel.price}
                  </p>

                  <Link
                    to={`/hotel/${hotel._id}`}
                    className="text-sm font-medium text-indigo-600 hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
