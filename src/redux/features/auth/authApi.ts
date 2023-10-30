import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

const AUTH_API = "/auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_API}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.USER],
    }),
    resetPassword: build.mutation({
      query: (resetPasswordPayload) => ({
        url: `${AUTH_API}/reset-password`,
        method: "POST",
        data: resetPasswordPayload,
      }),
    }),
    forgotPassword: build.mutation({
      query: (forgotPasswordPayload) => ({
        url: `${AUTH_API}/forgot-password`,
        method: "POST",
        data: forgotPasswordPayload,
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
