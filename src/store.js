import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    changeName(state) {
      state.name = "park";
    },
    changeAge(state) {
      state.age = state.age + 1;
    },
  },
});

export let { changeName, changeAge } = user.actions;

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

let thing = createSlice({
  name: "thing",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    plusThing(state, action) {
      state = [...state, action.payload]; // Create a new state array
    },
    addCount(state, action) {
      state[action.payload].count++;
    },
  },
});

export let { plusThing, addCount } = thing.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    thing: thing.reducer,
  },
});
