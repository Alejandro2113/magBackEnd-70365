import paths from "../utils/paths.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import { generateId } from "../utils/collectionHandler.js";
import ErrorManager from "./ErrorManager.js";

export default class RecipeManager {
  #jsonFilename;
  #cart;

  constructor() {
    this.#jsonFilename = "cart.json";
  }

  // Busca un receta por su ID
  async #findOneById(id) {
    this.#cart = await this.getAll();
    const cartFound = this.#cart.find((item) => item.id === Number(id));

    if (!cartFound) {
      throw new ErrorManager("ID no encontrado", 404);
    }

    return cartFound;
  }

  // Obtiene una lista de recetas
  async getAll() {
    try {
      this.#cart = await readJsonFile(paths.files, this.#jsonFilename);
      return this.#cart;
    } catch (error) {
      throw new ErrorManager(error.message, error.code);
    }
  }

  // Obtiene un receta específica por su ID
  async getOneById(id) {
    try {
      const cartFound = await this.#findOneById(id);
      return cartFound;
    } catch (error) {
      throw new ErrorManager(error.message, error.code);
    }
  }

  // Inserta un receta
  async insertOne(data) {
    try {
      const products = data?.ingredients?.map((item) => {
        return { ingredient: Number(item.ingredient), quantity: 1 };
      });

      const cart = {
        id: generateId(await this.getAll()),
        products: products ?? [],
      };

      this.#cart.push(cart);
      await writeJsonFile(paths.files, this.#jsonFilename, this.#cart);

      return cart;
    } catch (error) {
      throw new ErrorManager(error.message, error.code);
    }
  }

  // Agrega un ingrediente a una receta o incrementa la cantidad de un ingrediente existente
  addOneproduct = async (id, productId) => {
    try {
      const cartFound = await this.#findOneById(id);
      const productIndex = cartFound.ingredients.findIndex(
        (item) => item.product === Number(productId)
      );

      if (productIndex >= 0) {
        cartFound.ingredients[productIndex].quantity++;
      } else {
        cartFound.ingredients.push({ product: Number(productId), quantity: 1 });
      }

      const index = this.#cart.findIndex((item) => item.id === Number(id));
      this.#cart[index] = cartFound;
      await writeJsonFile(paths.files, this.#jsonFilename, this.#cart);

      return cartFound;
    } catch (error) {
      throw new ErrorManager(error.message, error.code);
    }
  };
}
