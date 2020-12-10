const { dateToString } = require("../../helpers/date");
const Post = require("../../models/post");
const User = require("../../models/user");

const { transformPost } = require("./merge");

module.exports = {
  posts: async () => {
    const posts = await Post.find();
    try {
      return posts.map((post) => {
        return transformPost(post);
      });
    } catch (error) {
      throw error;
    }
  },

  createPost: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    const post = new Post({
      title: args.postInput.title,
      content: args.postInput.content,
      isPublished: args.postInput.isPublished,
      date: new Date(args.postInput.date),
      author: req.userId,
    });
    let createdPost;

    try {
      const result = await post.save();
      createdPost = transformPost(result);
      const author = await User.findById(req.userId);

      if (!author) {
        throw new Error("User not found");
      }
      author.createdPosts.push(post);
      await author.save();

      return createdPost;
    } catch (error) {
      throw error;
    }
  },
};
