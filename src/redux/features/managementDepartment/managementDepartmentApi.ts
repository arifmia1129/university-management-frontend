import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const MANAGEMENT_DEPARTMENT_API = "/management-department";

const managementDepartmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addManagementDepartment: build.mutation({
      query: (data) => ({
        url: MANAGEMENT_DEPARTMENT_API,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.MANAGEMENT_DEPARTMENT],
    }),
  }),
});

export const { useAddManagementDepartmentMutation } = managementDepartmentApi;
