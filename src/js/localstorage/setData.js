export const setData = (property, value) => {
  localStorage.setItem(property, JSON.stringify(value));
};
