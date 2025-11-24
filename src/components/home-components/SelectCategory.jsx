import { useState } from "react";
import { useSelector } from "react-redux";

const SelectCategory = ({ type, setType }) => {
  const [type2, setTypes] = useState([]);
  const data = useSelector((state) => state.carsdata.data);
  let types = ["all", ...new Set(data?.data.map((car) => car.type))];
  return (
    <section className="category ">
      <div className="mycon flex flex-col gap-2 sm:gap-4 md:gap-6 xl:gap-8">
        <h5 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl pt-[60px] ">
          Select a vehicle group
        </h5>

        <div className="w-[80%] m-auto flex items-center justify-center gap-5">
          {types.map((Localtype, idx) => (
            <button
              key={idx}
              onClick={() => setType(Localtype)}
              className={`${
                Localtype == type ? "bg-purple-500" : "bg-gray-500"
              }  bg-[#c0c0c0]
        text-black 
        p-3 
        rounded-3xl 
        hover:bg-[#5937e0] 
        hover:text-white 
        transition 
        duration-300`}
            >
              {Localtype.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectCategory;
