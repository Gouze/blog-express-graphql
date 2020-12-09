const bcrypt = require("bcryptjs");

const User = require("../../models/user");
const Post = require("../../models/post");
const Comment = require("../../models/comment");

const posts = async (postIds) => {
  try {
    const posts = await Post.find({ _id: { $in: postIds } });
    posts.map((post) => {
      return {
        ...post._doc,
        date: new Date(post._doc.date).toISOString(),
        author: user.bind(this, post.author),
      };
    });
    return posts;
  } catch (error) {
    throw error;
  }
};

const singlePost = async (postId) => {
  try {
    const post = await post.findById(postId);
    return { ...post._doc, author: user.bind(this, post.author) };
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

module.exports = {
  posts: async () => {
    const posts = await Post.find();
    try {
      return posts.map((post) => {
        return {
          ...post._doc,
          date: new Date(post._doc.date).toISOString(),

          author: user.bind(this, post._doc.author),
        };
      });
    } catch (error) {
      throw error;
    }
  },
  comments: async () => {
    try {
      const comments = await Comment.find();
      return comments.map((comment) => {
        return {
          ...comment._doc,
          user: user.bind(this, comment._doc.user),
          post: singlePost.bind(this, comment._doc.post),
          createdAt: new Date(comment._doc.createdAt).toISOString(),
          updatedAt: new Date(comment._doc.updatedAt).toISOString(),
        };
      });
    } catch (error) {
      throw error;
    }
  },
  createPost: async (args) => {
    const post = new Post({
      title: args.postInput.title,
      content: args.postInput.content,
      isPublished: args.postInput.isPublished,
      date: new Date(args.postInput.date),
      author: "5fd044d8d7235560ec521c34",
    });
    let createdPost;

    try {
      const result = await post.save();
      createdPost = {
        ...result._doc,
        author: user.bind(this, result._doc.author),
      };
      const author = await User.findById("5fd044d8d7235560ec521c34");

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
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },

  commentPost: async (args) => {
    const fetchedPost = await Post.findOne({ _id: args.commentInput.postId });
    const comment = new Comment({
      user: "5fd044d8d7235560ec521c34",
      post: fetchedPost,
      content: args.commentInput.content,
    });

    const result = await comment.save();
    return {
      ...result._doc,
      user: user.bind(this, comment._doc.user),
      post: singlePost.bind(this, comment._doc.post),
      createdAt: new Date(result._doc.createdAt).toISOString(),
      updatedAt: new Date(result._doc.updatedAt).toISOString(),
    };
  },
  deleteComment: async (args) => {
    try {
      const comment = await Comment.findById(args.commentId).populate("post");
      console.log(comment);
      const post = {
        ...comment.post._doc,
        author: user.bind(this, comment.post._doc.author),
      };
      await Comment.deleteOne({ _id: args.commentId });
      return post;
    } catch (error) {
      throw error;
    }
  },
};
