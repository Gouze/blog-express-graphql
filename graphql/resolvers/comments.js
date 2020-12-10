const { dateToString } = require("../../helpers/date");
const Comment = require("../../models/comment");
const Post = require("../../models/post");
const { transformComment, transformPost } = require("./merge");

module.exports = {
  comments: async () => {
    try {
      const comments = await Comment.find();
      return comments.map((comment) => {
        return transformComment(comment);
      });
    } catch (error) {
      throw error;
    }
  },

  commentPost: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    const fetchedPost = await Post.findOne({ _id: args.commentInput.postId });
    const comment = new Comment({
      user: "5fd044d8d7235560ec521c34",
      post: fetchedPost,
      content: args.commentInput.content,
    });
    const result = await comment.save();
    return transformComment(result);
  },
  deleteComment: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    try {
      const comment = await Comment.findById(args.commentId).populate("post");
      const post = transformPost(comment.post);
      await Comment.deleteOne({ _id: args.commentId });
      return post;
    } catch (error) {
      throw error;
    }
  },
};
