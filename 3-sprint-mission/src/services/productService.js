import productRepository from "../repositories/productRepository.js";

async function createProduct(userId, product) {
  if (!product.name || !product.price) {
    throw new Error("required data");
  }
  if (!userId) {
    const error = new Error("userId not found");
    error.code = 400;
    throw error;
  }
  return await productRepository.save(userId, product);
}

async function getProduct(id) {
  const parseIntId = parseInt(id);
  if (!id) {
    throw new Error("product id required");
  }
  return await productRepository.getById(parseIntId);
}

async function updateProduct(id, data) {
  const parseIntId = parseInt(id, 10);
  const product = await productRepository.getById(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return await productRepository.update(parseIntId, data);
}

async function removeProduct(id, userId) {
  const parseIntId = parseInt(id, 10);
  const product = await productRepository.getById(id);
  console.log(parseIntId, userId);
  if (!product) {
    throw new Error("Product not found");
  }

  return await productRepository.remove(parseIntId);
}

async function getProductList(page, pageSize, orderBy, keyword) {
  try {
    const result = await productRepository.getProductList(
      page,
      pageSize,
      orderBy,
      keyword
    );
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addLike(userId, productId) {
  const parseIntProductId = parseInt(productId, 10);

  if (!parseIntProductId) {
    throw new Error("product not found");
  }

  const product = await productRepository.getById(parseIntProductId);

  if (!product) {
    throw new Error("product not found");
  }

  await productRepository.addLike(userId, parseIntProductId);

  return { isliked: true };
}

async function deleteLike(userId, productId) {
  const parseIntProductId = parseInt(productId, 10);

  if (!parseIntProductId) {
    throw new Error("product not found");
  }

  const product = await productRepository.getById(parseIntProductId);

  if (!product) {
    throw new Error("product not found");
  }

  await productRepository.deleteLike(userId, parseIntProductId);

  return { isliked: false };
}

async function getUserProducts(userId) {
  const products = await productRepository.getUserId(userId);
  if (!products || products.length === 0) {
    throw new Error("not found");
  }
  return products;
}

async function getUserLikeProducts(userId) {
  const products = await productRepository.userLikeProducts(userId);
  if (!products || products.length === 0) {
    throw new Error("not found");
  }
  return products;
}

export default {
  createProduct,
  getProduct,
  updateProduct,
  removeProduct,
  getProductList,
  addLike,
  deleteLike,
  getUserProducts,
  getUserLikeProducts,
};
