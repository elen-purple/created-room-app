export const openMenu = (x, y) => {
  console.log("eee");
  console.log(document.querySelector("#menu"));
  document.querySelector("#menu").classList.remove("is-hidden");
  document.querySelector("#menu").style.left = `${x}px`;
  document.querySelector("#menu").style.top = `${y}px`;
};
