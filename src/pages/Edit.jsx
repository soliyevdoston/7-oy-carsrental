import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { Input, InputNumber, Select } from "antd";
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";

function Edit() {
  const axios = useAxios();
  const { id } = useParams();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const getSingleCar = async (id) => {
    try {
      const res = await axios({ url: `cars/${id}` });
      if (res?.data) {
        setCar(res.data);
        setGallery(res.data.gallery);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleCar(id);
  }, [id]);

  function handleGallery(url) {
    setGallery(gallery.filter((el) => el !== url));
  }

  function addImage() {
    const img = prompt("URL kiriting");
    try {
      new URL(img);
      setGallery((prev) => [...prev, img]);
    } catch {
      alert("URL xato!");
    }
  }

  if (!car) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 bg-gray-50">
      {/* Back button */}
      <button
        onClick={() => navigate(`/cars/${id}`)}
        className="fixed z-10 right-4 top-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors"
      >
        ⬅ ComeBack
      </button>

      {/* Form container */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Edit {car.name}
        </h2>

        <form className="flex flex-col gap-6">
          {/* Name and Price */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-medium">
                Mashina nomi
              </label>
              <Input name="name" defaultValue={car.name} id="name" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="pricePerDay" className="font-medium">
                Kunlik ijara narxi ($)
              </label>
              <InputNumber
                name="pricePerDay"
                defaultValue={car.pricePerDay}
                min={1}
                max={100}
                id="pricePerDay"
                className="w-full"
              />
            </div>
          </div>

          {/* Fuel and Drive */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="fuel" className="font-medium">
                Yonilg'i turi
              </label>
              <Input name="fuel" defaultValue={car.details.fuel} id="fuel" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="drive" className="font-medium">
                Mashina tortish turi
              </label>
              <Select
                defaultValue={car.drive}
                name="drive"
                options={[
                  { value: "AWD", label: "4x4 umumiy tortadi" },
                  { value: "FWD", label: "2x oldi tortadi" },
                  { value: "RWD", label: "2x orqa tortadi" },
                ]}
              />
            </div>
          </div>

          {/* Gearbox */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="gearbox" className="font-medium">
                Uzatmalar qutisi
              </label>
              <Select
                defaultValue={car.details.gearbox}
                name="gearbox"
                options={[
                  { value: "Manual", label: "Ruchnoy" },
                  { value: "Automatic", label: "Avtomat" },
                ]}
              />
            </div>
          </div>

          {/* Gallery */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Gallery</h3>
            <div className="flex gap-4 flex-wrap">
              {gallery.map((el, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 rounded-md overflow-hidden group"
                >
                  <img
                    src={el}
                    alt={`Rasm ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {gallery.length > 2 && (
                    <div
                      onClick={() => handleGallery(el)}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition"
                    >
                      <TrashIcon className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImage}
                className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded-md hover:border-blue-500 hover:text-blue-500"
              >
                <PlusCircledIcon className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
