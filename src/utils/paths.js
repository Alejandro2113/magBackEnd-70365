import path from "path";

const ROOT_PATH = path.resolve();
const SRC_PATH = path.join(ROOT_PATH, "src");

// Define las rutas claves del proyecto
const paths = {
  root: ROOT_PATH, // Ruta de la raíz del proyecto
  src: SRC_PATH, // Ruta del directorio "src"
  public: path.join(SRC_PATH, "public"), // Ruta de la raíz del directorio de archivos estáticos
  images: path.join(SRC_PATH, "public", "images"), // Ruta del directorio de imágenes
  files: path.join(SRC_PATH, "files"), // Ruta del directorio de archivos privados
  views: path.join(SRC_PATH, "views"), //Vistas Handlebars
};

export default paths;
