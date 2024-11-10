// Genera un nuevo ID incrementando el ID máximo actual
export const generateId = (collection) => {
  if (!Array.isArray(collection)) {
    throw new Error("Colección no válida");
  }

  let plusId = 0;
  collection.forEach((item) => {
    if (item.id > plusId) {
      plusId = item.id;
    }
  });

  return plusId + 1;
};
