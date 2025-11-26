import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { Button, Input, InputNumber, notification, Select } from "antd";
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";

function Edit() {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, { title, description }) => {
    api[type]({
      title,
      description,
    });
  };
  const axios = useAxios();
  const { id } = useParams();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);
  const [drive, setDrive] = useState("");
  const [gearbox, setGearbox] = useState(null);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", price: "" });

  const getSingleCar = async (id) => {
    try {
      let data = await axios({ url: `cars/${id}` });
      if (data && data.data) {
        setCar(data.data);
        setGallery(data.data.gallery);
        setDrive(data.data.drive);
        setGearbox(data.data.gearbox);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  async function editCar(car) {
    await axios({
      url: `cars/${id}`,
      method: "PATCH",
      body: car,
    });
    setTimeout(() => {
      navigate(-1);
    }, 1000);
    openNotificationWithIcon("info", {
      description: "Muvaffaqiyatli o'zgartirildi",
    });
  }
  useEffect(() => {
    getSingleCar(id);
  }, []);

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
  const selectDrive = (val) => setDrive(val);
  function selectGearbox(value) {
    setGearbox(value);
  }

  async function handleDelete(id) {
    await axios({ url: `cars/${id}`, method: "DELETE" });
    alert("Succesfully deleted");
    navigate(-1);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const fd = new FormData(e.target); // <-- e.target: the form
      const payload = Object.fromEntries(fd.entries());
      console.log("payload", payload);
      const res = await axios.put(`/api/cars/${id}`, payload);
      console.log("saved", res.data);
    } catch (err) {
      console.error("save error", err);
    }
  }
  if (!car) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 bg-gray-50">
      {/* Back button */}
      {contextHolder}
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Name and Price */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-medium">
                Mashina nomi
              </label>
              <Input
                name="name"
                defaultValue={car.name}
                id="name"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
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
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, price: value }))
                }
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
                onChange={selectDrive}
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
                onChange={selectGearbox}
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
          <div className="gap-3 flex">
            <Button htmlType="submit" type="primary">
              Saqlash
            </Button>
            <Button onClick={() => handleDelete(id)} danger={true}>
              Delete
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
