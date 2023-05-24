const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Comment {
    _id: ID
    commentText: String
    createdAt: Date
    user: User
    event: Event
  }

  type Event {
    _id: ID
    eventName: String
    eventDescription: String
    mainImg: URL
    portraitImg: URL
    tags: String
    eventStartDate: Date
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
    email: Email
    password: String
    dateOfBirth: Date
    profilePic: URL
    comments: [Comment]
    friends
    assistingEvents
  }

  type Query {
    comment: [Comment]
    event: [Event]
    user: [User]
  }
`;

module.exports = typeDefs;
