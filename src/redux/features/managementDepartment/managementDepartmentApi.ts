import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const MANAGEMENT_DEPARTMENT_API = "/management-department";

const managementDepartmentApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addManagementDepartment: build.mutation({
      query: (data) => ({
        url: MANAGEMENT_DEPARTMENT_API,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.MANAGEMENT_DEPARTMENT],
    }),
    getManagementDepartment: build.query({
      query: (query: Record<string, any>) => ({
        url: MANAGEMENT_DEPARTMENT_API,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          department: data,
          meta,
        };
      },
      providesTags: [tagTypes.MANAGEMENT_DEPARTMENT],
    }),
  }),
});

export const {
  useAddManagementDepartmentMutation,
  useGetManagementDepartmentQuery,
} = managementDepartmentApi;
