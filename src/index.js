import { getFurnitureList } from "./js/fetchs/getFurnitureList";
import { makesFurnitureList } from "./js/markups/makesFurnitureList";
import { makesBgList } from "./js/markups/makesBgList";
import { addImgToRoom } from "./js/scripts/addImgToRoom";
import { openMenu } from "./js/scripts/openMenu";
import { getData } from "./js/localstorage/getData";
import { setData } from "./js/localstorage/setData";

if (!Object.keys(localStorage).includes("furniture")) {
  setData("furniture", []);
}

getFurnitureList("furniture").then((furniture) => {
  document.querySelector("#sidebar-list-furniture").innerHTML = makesFurnitureList(furniture);
});
getFurnitureList("other").then((other) => {
  document.querySelector("#sidebar-list-walls").innerHTML = makesBgList(other[0].walls);
});
getFurnitureList("other").then((other) => {
  document.querySelector("#sidebar-list-floor").innerHTML = makesBgList(other[1].floor);
});
getFurnitureList("other").then((other) => {
  document.querySelector("#sidebar-list-plants").innerHTML = makesFurnitureList(other[2].plants);
});
getFurnitureList("other").then((other) => {
  document.querySelector("#sidebar-list-windows").innerHTML = makesFurnitureList(other[3].windows);
});
getFurnitureList("other").then((other) => {
  document.querySelector("#sidebar-list-doors").innerHTML = makesFurnitureList(other[4].doors);
});

let isOpeningWalls = false
let isOpeningFloor = false
let isOpeningDoors = false
let isOpeningWindows = false
let isOpeningPlants = false
let isOpeningFurniture = false

document.querySelector("#sidebar-top-floor").addEventListener("click", (e) => {
  if (isOpeningFloor) {
    document.querySelector("#sidebar-list-floor").style.display = "none"
    isOpeningFloor = false
    e.currentTarget.lastElementChild.style.transform = "rotate(0deg)"
  } else {
    document.querySelector("#sidebar-list-floor").style.display = "flex"
    isOpeningFloor = true
    e.currentTarget.lastElementChild.style.transform = "rotate(180deg)"
  }
})
document.querySelector("#sidebar-top-walls").addEventListener("click", (e) => {
  if (isOpeningWalls) {
    document.querySelector("#sidebar-list-walls").style.display = "none"
    isOpeningWalls = false
    e.currentTarget.lastElementChild.style.transform = "rotate(0deg)"
  } else {
    document.querySelector("#sidebar-list-walls").style.display = "flex"
    isOpeningWalls = true
    e.currentTarget.lastElementChild.style.transform = "rotate(180deg)"
  }
})
document.querySelector("#sidebar-top-doors").addEventListener("click", (e) => {
  if (isOpeningDoors) {
    document.querySelector("#sidebar-list-doors").style.display = "none"
    isOpeningDoors = false
    e.currentTarget.lastElementChild.style.transform = "rotate(0deg)"
  } else {
    document.querySelector("#sidebar-list-doors").style.display = "flex"
    isOpeningDoors = true
    e.currentTarget.lastElementChild.style.transform = "rotate(180deg)"
  }
})
document.querySelector("#sidebar-top-windows").addEventListener("click", (e) => {
  if (isOpeningWindows) {
    document.querySelector("#sidebar-list-windows").style.display = "none"
    isOpeningWindows = false
    e.currentTarget.lastElementChild.style.transform = "rotate(0deg)"
  } else {
    document.querySelector("#sidebar-list-windows").style.display = "flex"
    isOpeningWindows = true
    e.currentTarget.lastElementChild.style.transform = "rotate(180deg)"
  }
})
document.querySelector("#sidebar-top-plants").addEventListener("click", (e) => {
  if (isOpeningPlants) {
    document.querySelector("#sidebar-list-plants").style.display = "none"
    isOpeningPlants = false
    e.currentTarget.lastElementChild.style.transform = "rotate(0deg)"
  } else {
    document.querySelector("#sidebar-list-plants").style.display = "flex"
    isOpeningPlants = true
    e.currentTarget.lastElementChild.style.transform = "rotate(180deg)"
  }
})
document.querySelector("#sidebar-top-furniture").addEventListener("click", (e) => {
  if (isOpeningFurniture) {
    document.querySelector("#sidebar-list-furniture").style.display = "none"
    isOpeningFurniture = false
    e.currentTarget.lastElementChild.style.transform = "rotate(0deg)"
  } else {
    document.querySelector("#sidebar-list-furniture").style.display = "flex"
    isOpeningFurniture = true
    e.currentTarget.lastElementChild.style.transform = "rotate(180deg)"
  }
})

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
    .querySelector(`#${img}`).style.transform = `rotate(${Number.parseInt(
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
      `<img class="room__img" data-image style="top: ${document.querySelector("#all").querySelector(`#${img}`).style.top
      }; left: ${document.querySelector("#all").querySelector(`#${img}`).style.left
      };transform: ${document.querySelector("#all").querySelector(`#${img}`).style.transform
      }" id="${img}" src="${document.querySelector("#all").querySelector(`#${img}`).src
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
      `<img class="room__img" data-image style="top: ${document.querySelector("#all").querySelector(`#${img}`).style.top
      }; left: ${document.querySelector("#all").querySelector(`#${img}`).style.left
      };transform: ${document.querySelector("#all").querySelector(`#${img}`).style.transform
      }" id="${img}" src="${document.querySelector("#all").querySelector(`#${img}`).src
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


let moveImg = ""
let isMooving = false

document.querySelector("#room").addEventListener("mousedown", (e) => {
  if (e.target.hasAttribute("data-image")) {
    isMooving = true
    moveImg = e.target.id
    console.log("a1")

  }
})

document.querySelector("#room").addEventListener("mouseup", (e) => {
  moveImg = ""
  isMooving = false
  console.log("a2")

})

document.addEventListener('mousemove', (e) => {
  if (isMooving === true) {
    console.log("a")
    document.querySelector(`#${moveImg}`).style.left = `${e.clientX}px`;
    document.querySelector(`#${moveImg}`).style.top = `${e.clientY}px`;
  }
});


document.querySelector("#remove-all").addEventListener("click", () => {
  console.log("a")
  setData("furniture", [])
  document.querySelector("#all").innerHTML = ""
})

