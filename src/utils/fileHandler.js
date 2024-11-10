import fs from "fs";
import path from "path";

const validatePathAndName = (filepath, filename) => {
  if (!filepath)
    throw new Error(`La ruta del archivo ${filename} no fue proporcionada.`);
  if (!filename)
    throw new Error(`El nombre del archivo ${filename} no fue proporcionado.`);
};

//Lee archivos
export const readJsonFile = async (filepath, filename) => {
  validatePathAndName(filepath, filename);

  try {
    const content = await fs.promises.readFile(
      path.join(filepath, filename),
      "utf8"
    );
    return JSON.parse(content || "[]");
  } catch (error) {
    throw new Error(`Error al leer el archivo ${filename}`);
  }
};

//Escribe contenido
export const writeJsonFile = async (filepath, filename, content) => {
  validatePathAndName(filepath, filename);

  if (!content) throw new Error("El contenido no existe.");

  try {
    await fs.promises.writeFile(
      path.join(filepath, filename),
      JSON.stringify(content, null, "\t"),
      "utf8"
    );
  } catch (error) {
    throw new Error(`Error al escribir en el archivo ${filename}`);
  }
};

// Elimina un archivo
export const deleteFile = async (filepath, filename) => {
  validatePathAndName(filepath, filename);

  try {
    await fs.promises.unlink(path.join(filepath, filename));
  } catch (error) {
    if (error.code === "ENOENT") {
      console.warn(`El archivo ${filename} no existe.`);
    } else {
      throw new Error(`Error al eliminar el archivo ${filename}`);
    }
  }
};