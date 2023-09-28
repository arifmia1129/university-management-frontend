import { storeToLocalStorage } from "@/utils/local-store";

export const storeToken = (accessToken: string) => {
  storeToLocalStorage("accessToken", accessToken);
};
