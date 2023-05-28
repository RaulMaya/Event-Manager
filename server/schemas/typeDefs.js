const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Comment {
    _id: ID
    commentText: String
    createdAt: String
    user: User
    event: Event
  }

  type Event {
    _id: ID
    eventName: String
    eventDescription: String
    mainImg: String
    portraitImg: String
    tags: String
    eventStartDate: String
    eventLocation: String
    eventType: String
    eventCapacity: Int
    eventInvitation: Boolean
    comments: [Comment]
    usersAssisting: [User]
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    dateOfBirth: String
    profilePic: String
    comments: [Comment]
    friends: [User]
    assistingEvents: String
  }

  type Query {
    comments: [Comment]
    events: [Event]
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(
      username: String!
      email: String!
      dateOfBirth: String!
      profilePic: String!
      password: String!
    ): User
    updateUser(
      id: ID!
      username: String!
      email: String!
      dateOfBirth: String!
      profilePic: String!
      password: String!
    ): User
    deleteUser(
      id: ID!
    ): User
    # Set the required fields for new schools
    addComment(commentText: String!, userId: String!, eventId: String!): Comment
  }
`;

module.exports = typeDefs;
