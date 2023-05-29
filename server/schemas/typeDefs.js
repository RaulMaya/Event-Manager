const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    dateOfBirth: String
    profilePic: String
    comments: [Comment]
    friends: [User]
    assistingEvents: [Event]
    createdEvents: [Event]
  }

  type Auth {
    token: ID!
    user: User
  }

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
    tags: [String!]!
    eventStartDate: String
    eventLocation: EventLocation!
    eventType: String!
    eventCapacity: Int!
    eventInvitation: Boolean!
    minAge: Int!
    createdAt: String!
    usersAssisting: [User]
    createdBy: User
    comments: [Comment]
  }

  type EventLocation {
    address: String
    city: String
    country: String
    state: String
    lat: Float
    lon: Float
  }

  input EventLocationInput {
    address: String
    city: String
    country: String
    state: String
    lat: Float
    lon: Float
  }

  type Query {
    comments: [Comment]
    events: [Event]
    users: [User]
    user(id: ID!): User
    event(id: ID!): Event
    comment(id: ID!): Comment
  }

  type Mutation {
    createUser(
      username: String!
      email: String!
      dateOfBirth: String!
      profilePic: String!
      password: String!
    ): Auth
    updateUser(
      id: ID!
      username: String!
      email: String!
      dateOfBirth: String!
      profilePic: String!
      password: String!
    ): User
    deleteUser(id: ID!): User
    createEvent(
      eventName: String!
      eventCategory: String!
      eventDescription: String!
      mainImg: String!
      portraitImg: String!
      tags: [String!]!
      eventStartDate: String!
      eventLocation: EventLocationInput!
      eventType: String!
      eventCapacity: Int!
      eventInvitation: Boolean!
      minAge: Int!
      createdBy: ID!
    ): Event
    updateEvent(
      id: ID!
      eventName: String!
      eventCategory: String!
      eventDescription: String!
      mainImg: String!
      portraitImg: String!
      tags: [String!]!
      eventStartDate: String!
      eventLocation: EventLocationInput!
      eventType: String!
      eventCapacity: Int!
      eventInvitation: Boolean!
      minAge: Int!
      createdBy: ID!
    ): Event
    deleteEvent(id: ID!): Event
    assistEvent(eventId: ID!, userId: ID!): Event
    unconfirmEvent(eventId: ID!, userId: ID!): Event
    createComment(eventId: ID!, userId: ID!, commentText: String!): Comment
    deleteComment(id: ID!): Comment
    updateComment(commentId: ID!, commentText: String!): Comment
    addFriend(userId: ID!, friendId: ID!): User
    removeFriend(userId: ID!, friendId: ID!): User
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
