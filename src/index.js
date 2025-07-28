import { getFurnitureList } from "./js/fetchs/getFurnitureList";
import { makesFurnitureList } from "./js/markups/makesFurnitureList";
import { addImgToRoom } from "./js/scripts/addImgToRoom";
import { openMenu } from "./js/scripts/openMenu";
import { getData } from "./js/localstorage/getData";
import { setData } from "./js/localstorage/setData";

if (!Object.keys(localStorage).includes("furniture")) {
  setData("furniture", []);
}

getFurnitureList().then((furniture) => {
  makesFurnitureList(furniture);
});

let id = 1;

document.querySelector("#all").innerHTML = getData("furniture")
  .map(
    (f) =>
      `<img class="room__img" data-image style="top: ${f.top}; left: ${f.left};transform: rotate(${f.rotate}deg)" id="img-${f.id}" src="${f.src}" alt="Furniture"/>`
  )
  .join("");

document.querySelector("#sidebar").addEventListener("click", (e) => {
  if (
    e.target.hasAttribute("data-img") ||
    e.target.firstElementChild.hasAttribute("data-img")
  ) {
    const target = e.target.hasAttribute("data-img")
      ? e.target
      : e.target.firstElementChild;
    addImgToRoom(id, target.src);
    document
      .querySelector("#all")
      .querySelector(`#img-${id}`).style.top = `0px`;
    document
      .querySelector("#all")
      .querySelector(`#img-${id}`).style.left = `0px`;
    const array = getData("furniture");
    array.push({
      id,
      src: target.src,
      top: 0,
      left: 0,
      rotate: 0,
    });
    setData("furniture", array);
    id += 1;
  }
});

let img = "";

document.querySelector("#all").addEventListener("contextmenu", (e) => {
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

document.querySelector("#rotate").addEventListener("click", () => {
  document
    .querySelector("#all")
    .querySelector(`#${img}`).style.transform = `rotate(${
    Number.parseInt(
      document
        .querySelector("#all")
        .querySelector(`#${img}`)
        .style.transform.slice(7)
    ) + 90
  }deg`;
  const array = getData("furniture");
  array.find((f) => `img-${f.id}` === img).rotate += 90;
  setData("furniture", array);
});

document.querySelector("#toup").addEventListener("click", (e) => {
  document
    .querySelector("#all")
    .insertAdjacentHTML(
      "beforeend",
      `<img class="room__img" data-image style="top: ${
        document.querySelector("#all").querySelector(`#${img}`).style.top
      }; left: ${
        document.querySelector("#all").querySelector(`#${img}`).style.left
      };transform: ${
        document.querySelector("#all").querySelector(`#${img}`).style.transform
      }" id="${img}" src="${
        document.querySelector("#all").querySelector(`#${img}`).src
      }" alt="Furniture"/>`
    );
  document.querySelector("#all").querySelector(`#${img}`).remove();
  const array = getData("furniture");
  array.push(array.find((f) => `img-${f.id}` === img));
  array.splice(array.indexOf(array.find((f) => `img-${f.id}` === img)), 1);
  setData("furniture", array);
});

document.querySelector("#todown").addEventListener("click", (e) => {
  document
    .querySelector("#all")
    .insertAdjacentHTML(
      "afterbegin",
      `<img class="room__img" data-image style="top: ${
        document.querySelector("#all").querySelector(`#${img}`).style.top
      }; left: ${
        document.querySelector("#all").querySelector(`#${img}`).style.left
      };transform: ${
        document.querySelector("#all").querySelector(`#${img}`).style.transform
      }" id="${img}" src="${
        document.querySelector("#all").querySelector(`#${img}`).src
      }" alt="Furniture"/>`
    );
  document.querySelector("#all").querySelectorAll(`#${img}`)[1].remove();
  const array = getData("furniture");
  const a = array.find((f) => `img-${f.id}` === img);
  array.unshift({
    id: a.id,
    src: a.src,
    top: a.top,
    left: a.left,
    rotate: a.rotate,
  });
  array.splice(array.indexOf(array.filter((f) => `img-${f.id}` === img)[1]), 1);
  setData("furniture", array);
});

document.querySelector("#deleted").addEventListener("click", (e) => {
  document.querySelector("#all").querySelector(`#${img}`).remove();
  const array = getData("furniture");
  array.splice(array.indexOf(array.find((f) => `img-${f.id}` === img)), 1);
  setData("furniture", array);
});

document.querySelector("body").addEventListener("mousedown", (e) => {
  console.log(e.target);
  if (e.target.hasAttribute("data-image")) {
    console.log("a");
  }
});
