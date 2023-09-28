import { baseApi } from "./features/api/apiSlice";

const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
};

export default reducer;
