import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const studentApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addStudent: build.mutation({
      query: (data) => ({
        url: `/users/create-student`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.STUDENT],
    }),
    deleteStudent: build.mutation({
      query: () => ({
        url: `/users/student`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.STUDENT],
    }),
    getStudent: build.query({
      query: (query: Record<string, any>) => ({
        url: `/student`,
        method: "GET",
        params: query,
      }),
      transformResponse: ({ data, meta }: { data: any; meta: any }) => {
        return {
          student: data,
          meta,
        };
      },
      providesTags: [tagTypes.STUDENT],
    }),
    getStudentById: build.query({
      query: (id: string) => ({
        url: `/student/${id}`,
        method: "GET",
      }),
      transformResponse: ({ data }: { data: any }) => {
        return data;
      },
      providesTags: [tagTypes.STUDENT],
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetStudentQuery,
  useDeleteStudentMutation,
  useGetStudentByIdQuery,
} = studentApi;
