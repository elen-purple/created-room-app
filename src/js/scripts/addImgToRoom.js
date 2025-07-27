export const addImgToRoom = (id, img) => {
  document
    .querySelector("#room")
    .insertAdjacentHTML(
      "beforeend",
      `<img class="room__img" id="img-${id}" src="${img}" alt="Furniture"/>`
    );
};
