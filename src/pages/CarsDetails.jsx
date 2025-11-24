import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { Pencil2Icon } from "@radix-ui/react-icons";

const CarsDetail = () => {
  const axios = useAxios();
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSingleCar = async (id) => {
    try {
      const res = await axios({ url: `cars/${id}` });
      if (res?.data) setCar(res.data);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleCar(id);
  }, [id]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h2 className="text-3xl font-bold text-gray-700 animate-pulse mb-4">
          Loading...
        </h2>
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!car) return <h2 className="text-center mt-20">Mashina topilmadi</h2>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-2xl rounded-3xl border border-gray-200 relative">
      <Link
        to="/"
        className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-white shadow hover:bg-gray-100 transition font-medium"
      >
        ⬅ Back
      </Link>

      <div className="w-full h-72 rounded-xl overflow-hidden shadow-lg">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">{car.name}</h2>

          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            <Pencil2Icon /> Edit
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-semibold">Type:</span> {car.type}
          </p>
          <p>
            <span className="font-semibold">Drive:</span> {car.drive}
          </p>
          <p>
            <span className="font-semibold">Fuel:</span> {car.details.fuel}
          </p>
          <p>
            <span className="font-semibold">Gearbox:</span>{" "}
            {car.details.gearbox}
          </p>
          <p>
            <span className="font-semibold">Doors:</span> {car.details.doors}
          </p>
          <p>
            <span className="font-semibold">Seats:</span> {car.details.seats}
          </p>
          <p>
            <span className="font-semibold">Air Conditioner:</span>{" "}
            {car.details.airConditioner}
          </p>
          <p>
            <span className="font-semibold">Price per Day:</span> $
            {car.pricePerDay}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {car.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Equipment
          </h3>
          <div className="flex gap-3 flex-wrap">
            {car.equipment.safety.map((item, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-md"
              >
                {item}
              </span>
            ))}
            {car.equipment.comfort.map((item, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-md"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Gallery</h3>
          <div className="grid grid-cols-3 gap-3">
            {car.gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${car.name} ${i}`}
                className="w-full h-24 object-cover rounded-lg shadow"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsDetail;
