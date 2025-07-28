import { getFurnitureList } from "./js/fetchs/getFurnitureList";
import { makesFurnitureList } from "./js/markups/makesFurnitureList";
import { makesFloorList } from "./js/markups/makesFloorList";
import { makesWallsList } from "./js/markups/makesWallsList";
import { addImgToRoom } from "./js/scripts/addImgToRoom";
import { openMenu } from "./js/scripts/openMenu";
import { getData } from "./js/localstorage/getData";
import { setData } from "./js/localstorage/setData";

if (!Object.keys(localStorage).includes("furniture")) {
  setData("furniture", []);
}
if (!Object.keys(localStorage).includes("index")) {
  setData("index", 1);
}
getFurnitureList("furniture").then((furniture) => {
  document.querySelector("#sidebar-list-furniture").innerHTML =
    makesFurnitureList(furniture);
});
getFurnitureList("other").then((other) => {
  document.querySelector("#sidebar-list-walls").innerHTML = makesWallsList(
    other[0].walls
  );
});
getFurnitureList("other").then((other) => {
  document.querySelector("#sidebar-list-floor").innerHTML = makesFloorList(
    other[1].floor
  );
});
getFurnitureList("other").then((other) => {
  document.querySelector("#sidebar-list-plants").innerHTML = makesFurnitureList(
    other[2].plants
  );
});
getFurnitureList("other").then((other) => {
  document.querySelector("#sidebar-list-windows").innerHTML =
    makesFurnitureList(other[3].windows);
});
getFurnitureList("other").then((other) => {
  document.querySelector("#sidebar-list-doors").innerHTML = makesFurnitureList(
    other[4].doors
  );
});

let isOpeningWalls = false;
let isOpeningFloor = false;
let isOpeningDoors = false;
let isOpeningWindows = false;
let isOpeningPlants = false;
let isOpeningFurniture = false;

document.querySelector("#sidebar-top-floor").addEventListener("click", (e) => {
  if (isOpeningFloor) {
    document.querySelector("#sidebar-list-floor").style.display = "none";
    isOpeningFloor = false;
    e.currentTarget.lastElementChild.style.transform = "rotate(0deg)";
  } else {
    document.querySelector("#sidebar-list-floor").style.display = "flex";
    isOpeningFloor = true;
    e.currentTarget.lastElementChild.style.transform = "rotate(180deg)";
  }
});
document.querySelector("#sidebar-top-walls").addEventListener("click", (e) => {
  if (isOpeningWalls) {
    document.querySelector("#sidebar-list-walls").style.display = "none";
    isOpeningWalls = false;
    e.currentTarget.lastElementChild.style.transform = "rotate(0deg)";
  } else {
    document.querySelector("#sidebar-list-walls").style.display = "flex";
    isOpeningWalls = true;
    e.currentTarget.lastElementChild.style.transform = "rotate(180deg)";
  }
});
document.querySelector("#sidebar-top-doors").addEventListener("click", (e) => {
  if (isOpeningDoors) {
    document.querySelector("#sidebar-list-doors").style.display = "none";
    isOpeningDoors = false;
    e.currentTarget.lastElementChild.style.transform = "rotate(0deg)";
  } else {
    document.querySelector("#sidebar-list-doors").style.display = "flex";
    isOpeningDoors = true;
    e.currentTarget.lastElementChild.style.transform = "rotate(180deg)";
  }
});
document
  .querySelector("#sidebar-top-windows")
  .addEventListener("click", (e) => {
    if (isOpeningWindows) {
      document.querySelector("#sidebar-list-windows").style.display = "none";
      isOpeningWindows = false;
      e.currentTarget.lastElementChild.style.transform = "rotate(0deg)";
    } else {
      document.querySelector("#sidebar-list-windows").style.display = "flex";
      isOpeningWindows = true;
      e.currentTarget.lastElementChild.style.transform = "rotate(180deg)";
    }
  });
document.querySelector("#sidebar-top-plants").addEventListener("click", (e) => {
  if (isOpeningPlants) {
    document.querySelector("#sidebar-list-plants").style.display = "none";
    isOpeningPlants = false;
    e.currentTarget.lastElementChild.style.transform = "rotate(0deg)";
  } else {
    document.querySelector("#sidebar-list-plants").style.display = "flex";
    isOpeningPlants = true;
    e.currentTarget.lastElementChild.style.transform = "rotate(180deg)";
  }
});
document
  .querySelector("#sidebar-top-furniture")
  .addEventListener("click", (e) => {
    if (isOpeningFurniture) {
      document.querySelector("#sidebar-list-furniture").style.display = "none";
      isOpeningFurniture = false;
      e.currentTarget.lastElementChild.style.transform = "rotate(0deg)";
    } else {
      document.querySelector("#sidebar-list-furniture").style.display = "flex";
      isOpeningFurniture = true;
      e.currentTarget.lastElementChild.style.transform = "rotate(180deg)";
    }
  });

if (!Object.keys(localStorage).includes("walls")) {
  setData("walls", "https://i.postimg.cc/kGjKLbj7/Group-4.png");
}

if (!Object.keys(localStorage).includes("floor")) {
  setData("floor", "https://i.postimg.cc/QNSQF2jv/Vector-11.png");
}

document.querySelector("#sidebar").addEventListener("click", (e) => {
  const child = e.target.firstElementChild;
  if (
    e.target.hasAttribute("data-walls") ||
    (child && child.hasAttribute("data-walls"))
  ) {
    const target = e.target.hasAttribute("data-walls")
      ? e.target
      : e.target.firstElementChild;
    setData("walls", target.src);
    changeBg();
  } else if (
    e.target.hasAttribute("data-floor") ||
    (child && child.hasAttribute("data-floor"))
  ) {
    const target = e.target.hasAttribute("data-floor")
      ? e.target
      : e.target.firstElementChild;
    setData("floor", target.src);
    changeBg();
  } else if (
    e.target.hasAttribute("data-img") ||
    (child && child.hasAttribute("data-img"))
  ) {
    const target = e.target.hasAttribute("data-img")
      ? e.target
      : e.target.firstElementChild;
    addImgToRoom(getData("index"), target.src);
    document
      .querySelector("#all")
      .querySelector(`#img-${getData("index")}`).style.top = `0px`;
    document
      .querySelector("#all")
      .querySelector(`#img-${getData("index")}`).style.left = `0px`;
    const array = getData("furniture");
    array.push({
      id: getData("index"),
      src: target.src,
      top: 0,
      left: 0,
      rotate: 0,
    });
    setData("furniture", array);
    const index = getData("index") + 1;
    setData("index", index);
  }
});

changeBg();

function changeBg() {
  document.querySelector("#room").style.backgroundImage = `url("${getData(
    "floor"
  )}"),url("${getData("walls")}")`;
}

document.querySelector("#all").innerHTML = getData("furniture")
  .map(
    (f) =>
      `<img class="room__img" data-image style="top: ${f.top}px; left: ${f.left}px; transform: rotate(${f.rotate}deg)" id="img-${f.id}" src="${f.src}" alt="Furniture"/>`
  )
  .join("");

let img = "";

document.querySelector("#all").addEventListener("contextmenu", (e) => {
  e.preventDefault();
  if (e.target.hasAttribute("data-image")) {
    img = e.target.id;
    const rect = document.querySelector("#room").getBoundingClientRect();
    openMenu(e.pageX - rect.left, e.pageY - rect.top);
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

let moveImg = "";
let isMoving = false;

document.querySelector("#room").addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-image")) {
    if (isMoving) {
      isMoving = false;
      moveImg = "";
    } else {
      isMoving = true;
      moveImg = e.target.id;
    }
  }
});

document.querySelector("#room").addEventListener("mousemove", (e) => {
  if (isMoving === true) {
    const rect = document.querySelector("#room").getBoundingClientRect();
    let x =
      e.clientX -
      document.querySelector("#all").querySelector(`#${moveImg}`).clientWidth /
        2 -
      rect.left;
    let y =
      e.clientY -
      document.querySelector("#all").querySelector(`#${moveImg}`).clientHeight /
        2 -
      rect.top;
    if (x < 0) {
      x = 0;
    }
    if (
      x >
      document.querySelector("#room").clientWidth -
        document.querySelector("#all").querySelector(`#${moveImg}`).scrollWidth
    ) {
      x =
        document.querySelector("#room").clientWidth -
        document.querySelector("#all").querySelector(`#${moveImg}`).scrollWidth;
    }
    if (y < 0) {
      y = 0;
    }
    if (
      y >
      document.querySelector("#room").clientHeight -
        document.querySelector("#all").querySelector(`#${moveImg}`).clientHeight
    ) {
      y =
        document.querySelector("#room").clientHeight -
        document.querySelector("#all").querySelector(`#${moveImg}`)
          .clientHeight;
    }
    document
      .querySelector("#all")
      .querySelector(`#${moveImg}`).style.left = `${x}px`;
    document
      .querySelector("#all")
      .querySelector(`#${moveImg}`).style.top = `${y}px`;
    const array = getData("furniture");
    const f = array.find((f) => `img-${f.id}` === moveImg);
    f.top = y;
    f.left = x;
    setData("furniture", array);
  }
});

document.querySelector("#remove-all").addEventListener("click", () => {
  setData("furniture", []);
  setData("index", 1);
  setData("walls", "https://i.postimg.cc/kGjKLbj7/Group-4.png");
  setData("floor", "https://i.postimg.cc/QNSQF2jv/Vector-11.png");
  changeBg();
  document.querySelector("#all").innerHTML = "";
});
