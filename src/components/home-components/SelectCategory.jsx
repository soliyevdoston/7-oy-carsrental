import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SelectCategory = ({ type, setType }) => {
  const data = useSelector((state) => state.carsdata.data);
  const categorys = useSelector((state) => state.carsdata.categorys);

  return (
    <section className="category">
      <div className="mycon flex flex-col gap-2 sm:gap-4 md:gap-6 xl:gap-8">
        <h5 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          Select a vehicle group
        </h5>

        <div className="w-[80%] m-auto flex items-center justify-center gap-5 flex-wrap">
          {categorys.map((Localtype, idx) => (
            <button
              key={idx}
              onClick={() => setType(Localtype)}
              className={`${
                Localtype === type ? "bg-purple-500" : "bg-gray-500"
              } p-3 rounded-3xl text-white`}
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
