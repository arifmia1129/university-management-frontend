export const storeToLocalStorage = (key: string, value: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }

  localStorage.setItem(key, value);
};
export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem(key);
};
