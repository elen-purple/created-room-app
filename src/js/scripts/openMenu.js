export const openMenu = (x, y) => {
  document.querySelector("#menu").classList.remove("is-hidden");
  document.querySelector("#menu").style.left = `${x}px`;
  document.querySelector("#menu").style.top = `${y}px`;
};
