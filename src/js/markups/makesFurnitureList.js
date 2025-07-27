export const makesFurnitureList = (furniture) => {
  document.querySelector("#sidebar-list").innerHTML = furniture
    .map(
      (f) => `<li class="sidebar__item">
        <img id="img-${f.id}" data-img class="sidebar__img" src="${f.img}" alt="Furniture" />
      </li>`
    )
    .join("");
};
