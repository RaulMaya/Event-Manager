import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation createComment($eventId: ID!, $userId: ID!, $commentText: String!) {
    createComment(
      eventId: $eventId
      userId: $userId
      commentText: $commentText
    ) {
      _id
      commentText
      user {
        _id
        username
      }
      event {
        _id
        eventName
      }
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment($commentId: ID!, $commentText: String!) {
    updateComment(commentId: $commentId, commentText: $commentText) {
      _id
      commentText
      user {
        _id
        username
      }
      event {
        _id
        eventName
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id) {
      _id
      commentText
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $email: String!
    $password: String!
    $profilePic: String
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
      profilePic: $profilePic
    ) {
      _id
      username
      email
      profilePic
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $username: String!
    $email: String!
    $password: String!
    $profilePic: String
  ) {
    updateUser(
      id: $id
      username: $username
      email: $email
      password: $password
      profilePic: $profilePic
    ) {
      _id
      username
      email
      profilePic
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      _id
      username
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation createEvent(
    $eventName: String!
    $eventCategory: String!
    $eventDescription: String!
    $mainImg: String
    $portraitImg: String
    $tags: [String]
    $eventStartDate: String
    $eventLocation: String
    $eventType: String
    $eventCapacity: Int
    $eventInvitation: Boolean
    $minAge: Int
    $createdBy: ID!
  ) {
    createEvent(
      eventName: $eventName
      eventCategory: $eventCategory
      eventDescription: $eventDescription
      mainImg: $mainImg
      portraitImg: $portraitImg
      tags: $tags
      eventStartDate: $eventStartDate
      eventLocation: $eventLocation
      eventType: $eventType
      eventCapacity: $eventCapacity
      eventInvitation: $eventInvitation
      minAge: $minAge
      createdBy: $createdBy
    ) {
      _id
      eventName
      eventCategory
      eventDescription
      mainImg
      portraitImg
      tags
      eventStartDate
      eventLocation
      eventType
      eventCapacity
      eventInvitation
      minAge
      createdBy {
        _id
        username
      }
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation updateEvent(
    $id: ID!
    $eventName: String!
    $eventCategory: String!
    $eventDescription: String!
    $mainImg: String
    $portraitImg: String
    $tags: [String]
    $eventStartDate: String
    $eventLocation: String
    $eventType: String
    $eventCapacity: Int
    $eventInvitation: Boolean
    $minAge: Int
  ) {
    updateEvent(
      id: $id
      eventName: $eventName
      eventCategory: $eventCategory
      eventDescription: $eventDescription
      mainImg: $mainImg
      portraitImg: $portraitImg
      tags: $tags
      eventStartDate: $eventStartDate
      eventLocation: $eventLocation
      eventType: $eventType
      eventCapacity: $eventCapacity
      eventInvitation: $eventInvitation
      minAge: $minAge
    ) {
      _id
      eventName
      eventCategory
      eventDescription
      mainImg
      portraitImg
      tags
      eventStartDate
      eventLocation
      eventType
      eventCapacity
      eventInvitation
      minAge
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      _id
      eventName
    }
  }
`;

export const ASSIST_EVENT = gql`
  mutation assistEvent($eventId: ID!, $userId: ID!) {
    assistEvent(eventId: $eventId, userId: $userId) {
      _id
      eventName
      usersAssisting {
        _id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($userId: ID!, $friendId: ID!) {
    addFriend(userId: $userId, friendId: $friendId) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($userId: ID!, $friendId: ID!) {
    removeFriend(userId: $userId, friendId: $friendId) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;
