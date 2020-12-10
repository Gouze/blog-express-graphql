const { dateToString } = require("../../helpers/date");
const Post = require("../../models/post");
const User = require("../../models/user");

const posts = async (postIds) => {
  try {
    const posts = await Post.find({ _id: { $in: postIds } });
    return posts.map((post) => {
      return transformPost(post);
    });
  } catch (error) {
    throw error;
  }
};

const singlePost = async (postId) => {
  try {
    const post = await Post.findById(postId);
    return transformPost(post);
  } catch (error) {
    throw error;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      createdPosts: posts.bind(this, user._doc.createdPosts),
    };
  } catch (error) {
    throw error;
  }
};

const transformPost = (post) => {
  return {
    ...post._doc,
    date: dateToString(post._doc.date),
    author: user.bind(this, post._doc.author),
    createdAt: dateToString(post._doc.createdAt),
    updatedAt: dateToString(post._doc.updatedAt),
  };
};

const transformComment = (comment) => {
  return {
    ...comment._doc,
    user: user.bind(this, comment._doc.user),
    post: singlePost.bind(this, comment._doc.post),
    createdAt: dateToString(comment._doc.createdAt),
    updatedAt: dateToString(comment._doc.updatedAt),
  };
};

exports.transformComment = transformComment;
exports.transformPost = transformPost;
