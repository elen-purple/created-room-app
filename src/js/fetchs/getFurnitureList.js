export const getFurnitureList = async (name) => {
  try {
    return await fetch(
      `https://68860803f52d34140f6b2f20.mockapi.io/create-room-app/${name}`
    ).then((response) => response.json());
  } catch (e) {
    return e;
  }
};
