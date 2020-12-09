const { buildSchema } = require("graphql");

module.exports = buildSchema(`


        type User {
            _id: ID!,
            email: String!
            password: String
            createdPosts: [Post!]
            createdAt: String!
            updatedAt: String!
        }


        type Post {
            _id: ID!
            title: String!
            content: String
            date: String!
            isPublished: Boolean!
            author: User!
            createdAt: String!
            updatedAt: String!
        
        }

        type Comment{
            _id: ID!
            user: User!
            post: Post!
            content: String!
            createdAt: String!
            updatedAt: String!
        }


        input PostInput{
            title: String!
            content: String
            date: String!
            isPublished: Boolean!
        }

        input UserInput{
            email: String!
            password: String!
        }

        input CommentInput{
            postId: ID!
            content: String!
        }

        type RootQuery {
            posts: [Post!]!
            comments: [Comment!]!
        }

        type RootMutation {
            createPost(postInput: PostInput): Post
            createUser(userInput: UserInput): User
            commentPost(commentInput: CommentInput): Comment!
            deleteComment(commentId: ID!): Post!
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `);
