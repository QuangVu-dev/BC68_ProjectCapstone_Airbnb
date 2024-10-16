export const setLocalStorage = (key, value) => {
  const localString = JSON.stringify(value);
  localStorage.setItem(key, localString);
};

export const getLocalStorage = (key) => {
  const dataLocal = localStorage.getItem(key);
  return dataLocal ? JSON.parse(dataLocal) : null;
};
export const getCurrentDateTime = () => {
  const postCmtTime = new Date();
  const year = postCmtTime.getFullYear();
  const month = String(postCmtTime.getMonth() + 1).padStart(2, "0");
  const day = String(postCmtTime.getDate()).padStart(2, "0");
  const hours = String(postCmtTime.getHours()).padStart(2, "0");
  const minutes = String(postCmtTime.getMinutes()).padStart(2, "0");
  const seconds = String(postCmtTime.getSeconds()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};