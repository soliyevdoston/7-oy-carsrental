import { useEffect } from "react";
import Header from "../components/header/Header";
import SelectCategory from "../components/home-components/SelectCategory";
import useAxios from "../hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../redux/cars-data-slice";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.carsdata);
  const axios = useAxios();

  const getCars = async () => {
    let data = await axios({ url: "cars" });
    dispatch(setData(data.data));
  };
  useEffect(() => {
    getCars();
  }, []);
  console.log(data);

  return (
    <>
      <Header />
      <SelectCategory />

      <section className="all-cars   pt-6">
        <div className="mycon grid grid-cols-3 gap-6">
          {data?.data.map((car) => (
            <div
              key={car.id}
              className="bg-white p-5 rounded-2xl shadow-md border hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold">{car.name}</h2>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
