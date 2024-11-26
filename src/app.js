import express from "express";
import paths from "./utils/paths.js";
import { config as configHandlebars } from "./config/handlebars.config.js";
import { config as configWebsocket } from "./config/websocket.config.js";

import routerProducts from "./routers/products.router.js";
import routeCart from "./routers/cart.router.js";
import routerViewHome from "./routers/home.view.router.js";

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

//Motor de plantillas
configHandlebars(app);

// Declaración de rutas
app.use("/api/products", routerProducts);
app.use("/api/cart", routeCart);
app.use("/", routerViewHome);

//Rutas Inexistentes
app.use("*", (req, res) => {
  res.status(404).render("error404", { tittle: "error404" });
});

// Se levanta el servidor oyendo en el puerto definido
const httpServer = app.listen(PORT, () => {
  console.log(`Ejecutándose en http://localhost:${PORT}`);
});

// Configuración del servidor de websocket
configWebsocket(httpServer);
