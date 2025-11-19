const SelectCategory = () => {
  return (
    <section className="category ">
      <div className="mycon flex flex-col gap-2 sm:gap-4 md:gap-6 xl:gap-8">
        <h5 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl pt-[60px] ">
          Select a vehicle group
        </h5>

        <div className="w-[80%] m-auto flex items-center justify-center gap-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <button
              key={idx}
              className="bg-[#5937e0] p-3 rounded-3xl text-white mt-[40px]"
            >
              All vehicles
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectCategory;
