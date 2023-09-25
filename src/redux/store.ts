import { configureStore } from "@reduxjs/toolkit";
import reducer from "./rootreducer";

export const store = configureStore({
  reducer,
});
