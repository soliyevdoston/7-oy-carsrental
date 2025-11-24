import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router-dom";

const CarsDetail = () => {
  const axios = useAxios();
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [activeImg, setActiveImg] = useState("");

  const getSingleCar = async (id) => {
    let data = await axios({ url: `car/${id}` });
    if (data && data.data) {
      setCar(data.data);
      setActiveImg(data.data.image);
    }
  };
  useEffect(() => {
    getSingleCar(id);
  }, []);

  return (
    <div className="mt-10">
      <div className="mycon flex justify-between">
        <div className="cat-photos w-[45%] flex flex-col gap-4">
          <div>
            <h3>{car.name}</h3>
            <h5>${car.pricePerDay}</h5>
          </div>
          <Image className="w-full !h-[300px]" src={activeImg} />
          <div className="thumbnail flex items-center gap-4">
            {car.gallary?.map((img, idx) => (
              <Image
                onClick={() => setActiveImg(img)}
                className="!w-10 h-10"
                src={img}
                key={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
