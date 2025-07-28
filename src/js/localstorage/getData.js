export const getData = (property) => {
  return JSON.parse(localStorage.getItem(property));
};
