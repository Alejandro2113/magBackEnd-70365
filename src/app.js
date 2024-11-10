import express from "express";
import paths from "./utils/paths.js";

import routerProducts from "./routes/products.router.js";
import routeCart from "./routes/cart.router.js";

// Se crea una instancia de la aplicación Express
const app = express();

// Se define el puerto en el que el servidor escuchará las solicitudes
const PORT = 8080;

// Declaración de archivos estáticos desde la carpeta 'public'
// en la ruta 'http://localhost:8080/api/public'
app.use("/api/public", express.static("./src/public"));

// Middleware para acceder al contenido de formularios codificados en URL
app.use(express.urlencoded({ extended: true }));

// Middleware para acceder al contenido JSON de las solicitudes
app.use(express.json());

app.use("api/public", express.static(paths.public));

// Declaración de rutas
app.use("/api/products", routerProducts);
app.use("/api/cart", routeCart);

// Se levanta el servidor oyendo en el puerto definido
app.listen(PORT, () => {
  console.log(`Ejecutándose en http://localhost:${PORT}`);
});
