const productsList = document.getElementById("products-list");
const btnRefreshProductsList = document.getElementById(
  "btn-refresh-products-list"
);

const loadProductsList = async () => {
  const response = await fetch("/api/products", { method: "GET" });
  const data = await response.json();
  const products = data.payload;

  productsList.innerText = "";

  products.forEach((product) => {
    productsList.innerHTML += `<li>Id: ${product.id}<br /> - Nombre: ${product.title}<br /> - Cantidad: ${product.stock}</li>`;
    productsList.innerHTML += "<br />";
  });
};

btnRefreshProductsList.addEventListener("click", () => {
  loadProductsList();
});

// Se ejecuta para cargar la lista de ingredientes al ingresar o refrescar
loadProductsList();
