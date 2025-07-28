export const makesWallsList = (furniture) => {
  return furniture.map(
    (f) => `<li class="sidebar__item">
        <img id="img-${f.id}" data-walls class="sidebar__img" src="${f.img}" alt="Furniture" />
      </li>`
  )
    .join("");
};
