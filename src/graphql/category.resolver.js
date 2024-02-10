
const CategoryService = require('./../services/category.service');
const { checkRolesGql } = require('../utils/checkRolesGql');
const { checkJwtGql } = require('../utils/checkJWTGql');
const service = new CategoryService();

const addCategory = async (_, { dto }, context) => {
  const user = await checkJwtGql(context);
  checkRolesGql(user, 'admin');
  return service.create({
    ...dto,
    image: dto.image.href
  });
}


const getCategory = async (_, { id }) => await service.findOne(id);
module.exports = { addCategory, getCategory };
