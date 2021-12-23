import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: [],
  originalData: [],
  isCell: "Cell",
  columnsData: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.data = action.payload;
      state.originalData = action.payload;
    },
    addRow: (state, action) => {
      state.isCell = "Cell";
      const obj = {};
      action.payload.slice(1).forEach((item) => {
        obj[item.accessor] = "";
      });
      if (
        obj &&
        Object.keys(obj).length === 0 &&
        Object.getPrototypeOf(obj) === Object.prototype
      )
        return;
      else {
        state.data.splice(0, 0, obj);
        state.originalData = state.data;
      }
    },
    deleteRow: (state, action) => {
      let r = window.confirm("Are You Sure You Want To Delete Row?");
      if (r === true) {
        state.data.splice(action.payload, 1);
        state.originalData = state.data;
      }
    },
    resetData: (state, action) => {
      state.data = state.originalData;
    },
    updateMyData: (state, action) => {
      state.isCell = "Cell";
      state.originalData = state.data;
      const result = state.data.map((row, i) => {
        if (i === action.payload.index) {
          return {
            ...state.data[action.payload.index],
            [action.payload.id]: action.payload.value,
          };
        }
        return row;
      });
      state.data = result;
    },
    confirmEdit: (state, action) => {
      if (state.isCell === "Cell") {
        state.isCell = "Cell2";
      } else {
        state.isCell = "Cell";
      }
    },
    getColumns: (state, action) => {
      state.columnsData = action.payload;
    },
  },
});

export const {
  addRow,
  deleteRow,
  resetData,
  updateMyData,
  getData,
  confirmEdit,
  getColumns,
} = dataSlice.actions;

export default dataSlice.reducer;
