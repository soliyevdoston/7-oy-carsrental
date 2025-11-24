import React from "react";
import { Link } from "react-router-dom";

function CarsCard({ car }) {
  const { id, image, name, type, pricePerDay, fuel, gearbox } = car;

  return (
    <div className="border rounded-xl shadow-md overflow-hidden hover:shadow-xl transition p-4 flex flex-col justify-between bg-white">
      {/* Image */}
      <div className="w-full h-48 rounded-lg overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Name & Type */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
          <span className="text-sm text-gray-500">{type}</span>
        </div>
        <div className="text-right text-gray-800 font-semibold">
          ${pricePerDay} <br /> per day
        </div>
      </div>

      {/* Features */}
      <div className="mt-4 flex flex-wrap gap-4 text-gray-600 text-sm">
        <div className="flex items-center gap-2">
          <img
            src="/src/images/card-image/air.svg"
            alt="gearbox"
            className="w-5 h-5"
          />
          {gearbox}
        </div>

        <div className="flex items-center gap-2">
          <img
            src="/src/images/card-image/g17.svg"
            alt="fuel"
            className="w-5 h-5"
          />
          {fuel}
        </div>

        <div className="flex items-center gap-2">
          <img
            src="/src/images/card-image/g1593.svg"
            alt="AC"
            className="w-5 h-5"
          />
          Air Conditioner
        </div>
      </div>

      {/* Link button */}
      <Link
        to={`/cars/${id}`}
        className="mt-6 w-full text-center py-3 bg-purple-600 rounded-lg text-white font-medium hover:bg-purple-700 transition"
      >
        View Details
      </Link>
    </div>
  );
}

export default CarsCard;
