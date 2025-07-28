export const makesBgList = (furniture) => {
  return furniture.map(
    (f) => `<li class="sidebar__item">
        <img id="img-${f.id}" class="sidebar__img" src="${f.img}" alt="Furniture" />
      </li>`
  )
    .join("");
};
