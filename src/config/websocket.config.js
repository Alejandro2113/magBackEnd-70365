import { Server } from "socket.io";
import ProductsManager from "../managers/ProductsManager.js";

const ProductManager = new ProductsManager();

// Configura el servidor Socket.IO
export const config = (httpServer) => {
  // Crea una nueva instancia del servidor Socket.IO
  const socketServer = new Server(httpServer);

  // Escucha el evento de conexión de un nuevo cliente
  socketServer.on("connection", async (socket) => {
    console.log("Conexión establecida ok", socket.id);

    // Envía la lista de ingredientes al conectarse
    socketServer.emit("Products-list", {
      products: await ProductManager.getAll(),
    });

    socket.on("insert-Product", async (data) => {
      try {
        await ProductManager.insertOne(data);

        // Envía la lista de productos actualizada después de insertar
        socketServer.emit("products-list", {
          products: await ProductManager.getAll(),
        });
      } catch (error) {
        // Envía el mensaje de error
        socketServer.emit("error-message", { message: error.message });
      }
    });

    socket.on("delete-Product", async (data) => {
      try {
        await ProductManager.deleteOneById(Number(data.id));

        // Envía la lista de productos actualizada después de insertar
        socketServer.emit("products-list", {
          products: await ProductManager.getAll(),
        });
      } catch (error) {
        // Envía el mensaje de error
        socketServer.emit("error-message", { message: error.message });
      }
    });

    // Escucha el evento de desconexión del cliente
    socket.on("disconnect", () => {
      console.log("Se desconecto un cliente"); // Indica que un cliente se desconectó
    });
  });
};
