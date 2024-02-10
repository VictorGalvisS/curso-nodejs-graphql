const ProductsService = require('./../services/product.service');
const service = new ProductsService();

const getProduct = async (_, { id }) => await service.findOne(id);

const getProducts = async () => await service.find({});

const addProduct = async (_, { dto }) => await service.create(dto);

const updateProduct = async (_, { id, dto }) => await service.update(id, dto);

const deleteProduct = async (_, { id }) => {
  await service.delete(id);
  return id;
}

const getProductByCategory = (parent) => {
  const id = parent.dataValues.id;
  return service.getByCategory(id);
}

module.exports = { getProduct, getProducts, addProduct, updateProduct, deleteProduct, getProductByCategory };
