export const addImgToRoom = (id, img) => {
  document
    .querySelector("#room")
    .insertAdjacentHTML(
      "beforeend",
      `<img class="room__img" style="top:0; left:0" id="img-${id}" src="${img}" alt="Furniture"/>`
    );
};
