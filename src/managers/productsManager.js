import { productsModel } from "../db/models/products.model.js";

class ProductsManager {
  async createOne(obj) {
    const response = await productsModel.create(obj);
    return response;
  }

  async findAll({ limit = 10, page = 1, query = {}, sortOption, category}) {
    let sort = {};
    if (sortOption) {
      sort.price = sortOption === "asc" ? 1 : -1;
    }

    if (typeof query === "string" && query.trim().length > 0) {
      query.title = new RegExp(query, "i"); // Búsqueda insensible a mayúsculas/minúsculas
    }

    if (category) {
      query.category = category;
    }

    const totalProducts = await productsModel.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await productsModel
      .find(query)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort(sort)
      .exec();

    const response = {
      status: "success",
      payload: products,
      totalPages: totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page: page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/api/products?page=${page - 1}` : null,
      nextLink: page < totalPages ? `/api/products?page=${page + 1}` : null,
    };

    return response;
  }

  async findById(id) {
    const response = await productsModel.findById(id);
    return response;
  }

  async updateOne(id, obj) {
    const response = await productsModel.updateOne({ _id: id }, { obj });
    return response;
  }

  async deleteOne(id) {
    const response = await productsModel.findByIdAndDelete(id);
    return response;
  }
}

export const productsManager = new ProductsManager();
