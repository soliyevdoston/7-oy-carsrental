import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  categorys: [],
};

const carsDataSlice = createSlice({
  name: "carsdata",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      if (state.data == null) {
        let types = ["all", ...new Set(payload?.data.map((car) => car.type))];
        state.categorys = types;
      }
      state.data = payload;
    },
    editData: (state, payload) => {},
  },
});

export const { setData, editData } = carsDataSlice.actions;
export default carsDataSlice.reducer;
