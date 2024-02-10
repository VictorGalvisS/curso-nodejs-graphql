const boom = require('@hapi/boom');

const checkJwtGql = async (context) => {
  const { user } = await context.authenticate('jwt', { session: false });
  if (!user) {
    throw boom.notFound('jwt is not valid');
  }
  return user;
}

module.exports = { checkJwtGql };
