const authResolver = require("./auth");
const postsResolver = require("./posts");
const commentsResolver = require("./comments");

const rootResolver = {
  ...authResolver,
  ...postsResolver,
  ...commentsResolver,
};

module.exports = rootResolver;
