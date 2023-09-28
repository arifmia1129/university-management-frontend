import { configureStore } from "@reduxjs/toolkit";
import reducer from "./rootReducer";
import { baseApi } from "./features/api/apiSlice";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
