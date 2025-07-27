import { getFurnitureList } from "./js/fetchs/getFurnitureList";
import { makesFurnitureList } from "./js/markups/makesFurnitureList";
import { addImgToRoom } from "./js/scripts/addImgToRoom";

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
    console.log(id);
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
