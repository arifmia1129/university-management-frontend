import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import { tokenDecode } from "@/utils/jwt";
import { getFromLocalStorage, storeToLocalStorage } from "@/utils/local-store";

export const storeToken = (accessToken: string) => {
  storeToLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
};

export const getUserInfo = () => {
  const accessToken = getFromLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  if (accessToken) {
    return tokenDecode(accessToken);
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const accessToken = getFromLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

  return !!accessToken;
};
