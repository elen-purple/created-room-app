export const addImgToRoom = (id, img) => {
  document
    .querySelector("#room")
    .insertAdjacentHTML(
      "beforeend",
      `<img class="room__img" data-image style="transform:rotate(0deg)" id="img-${id}" src="${img}" alt="Furniture"/>`
    );
};
