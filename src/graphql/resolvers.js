const { getProduct, getProducts, addProduct, updateProduct, deleteProduct, getProductByCategory } = require('./product.resolvers');
const { login } = require('./auth.resolvers');
const { addCategory, getCategory } = require('./category.resolver');
const { RegularExpression } = require('graphql-scalars');

const CategoryNameType = new RegularExpression('CategoryNameType', /^[a-zA-Z0-9]{3,8}$/);

const resolvers = {
  Query: {
    hello: () => 'Hello  World',
    getPerson: (_, args) => `Hello. My name is ${args.name}, I'm ${args.age} year old`,
    getInt: (_, args) => args.age,
    getFloat: (_, args) => args.price,
    getString: () => 'P23abc',
    getBoolean: () => true,
    getID: () => '2312312sdsadsadsad2e',
    getNumbers: (_, args) => args.numbers,
    //Products
    product: getProduct,
    products: getProducts,
    category: getCategory,
  },
  Mutation: {
    login,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory
  },
  CategoryNameType,
  Category: {
    products: getProductByCategory
  }
}

module.exports = { resolvers };
