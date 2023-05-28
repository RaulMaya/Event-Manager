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
    tags: [String!]!
    eventStartDate: String
    eventLocation: EventLocation!
    eventType: String!
    eventCapacity: Int!
    eventInvitation: Boolean!
    minAge: Int!
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
    event(id: ID!): Event
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
    ): Event
    # Set the required fields for new schools
    addComment(commentText: String!, userId: String!, eventId: String!): Comment
  }
`;

module.exports = typeDefs;
