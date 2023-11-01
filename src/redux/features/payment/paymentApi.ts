import { tagTypes } from "@/redux/constant/tagTypes";
import { baseApi } from "../api/apiSlice";

export const BASE_STUDENT_SEMESTER_PAYMENT = "/payment";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    myPayments: build.query({
      query: (arg: any) => {
        return {
          url: `${BASE_STUDENT_SEMESTER_PAYMENT}/my-payment`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: ({ data, meta }: any) => {
        return {
          data,
          meta,
        };
      },
      providesTags: [tagTypes.PAYMENT],
    }),
    initialPayment: build.mutation({
      query: (data: any) => ({
        url: `${BASE_STUDENT_SEMESTER_PAYMENT}/initiate`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.PAYMENT],
    }),
  }),
});

export const { useMyPaymentsQuery, useInitialPaymentMutation } = paymentApi;

export default paymentApi;
