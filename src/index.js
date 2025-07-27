import { getFurnitureList } from "./js/fetchs/getFurnitureList";
import { makesFurnitureList } from "./js/markups/makesFurnitureList";
import { addImgToRoom } from "./js/scripts/addImgToRoom";
import { openMenu } from "./js/scripts/openMenu";

getFurnitureList().then((furniture) => {
  makesFurnitureList(furniture);
});

let id = 1;

document.querySelector("#sidebar").addEventListener("click", (e) => {
  if (
    e.target.hasAttribute("data-img") ||
    e.target.firstElementChild.hasAttribute("data-img")
  ) {
    const target = e.target.hasAttribute("data-img")
      ? e.target
      : e.target.firstElementChild;
    addImgToRoom(id, target.src);
    document.querySelector("#room").querySelector(`#img-${id}`).style.top = `${
      document.querySelector("#room").querySelector(`#img-${id}`).clientHeight /
      2
    }px`;
    document.querySelector("#room").querySelector(`#img-${id}`).style.left = `${
      document.querySelector("#room").querySelector(`#img-${id}`).clientWidth /
      2
    }px`;
    id += 1;
  }
});

let img = "";

document.querySelector("#room").addEventListener("contextmenu", (e) => {
  e.preventDefault();
  if (e.target.hasAttribute("data-image")) {
    img = e.target.id;
    openMenu(e.offsetX, e.offsetY);
  }
});

window.addEventListener("click", (e) => {
  if (!e.target.hasAttribute("data-image")) {
    document.querySelector("#menu").classList.add("is-hidden");
  }
});

document.querySelector("#rotate").addEventListener("click", (e) => {
  document
    .querySelector("#room")
    .querySelector(`#${img}`).style.transform = `rotate(${
    Number.parseInt(
      document
        .querySelector("#room")
        .querySelector(`#${img}`)
        .style.transform.slice(7)
    ) + 90
  }deg`;
});

document.querySelector("body").addEventListener("mousedown", (e) => {
  console.log(e.target);
  if (e.target.hasAttribute("data-image")) {
    console.log("a");
  }
});
