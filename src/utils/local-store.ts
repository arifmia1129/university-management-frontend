export const storeToLocalStorage = (key: string, value: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }

  localStorage.setItem(key, value);
};
