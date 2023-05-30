import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser(
    $username: String!
    $email: String!
    $dateOfBirth: String!
    $profilePic: String!
    $password: String!
  ) {
    createUser(
      username: $username
      email: $email
      dateOfBirth: $dateOfBirth
      profilePic: $profilePic
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation AddFriend($userId: ID!, $friendId: ID!) {
    addFriend(userId: $userId, friendId: $friendId) {
      _id
      username
      friends {
        _id
        username
        email
      }
    }
  }
`;

export const ATTEND_EVENT = gql`
  mutation AssistEvent($eventId: ID!) {
    assistEvent(eventId: $eventId) {
      _id
      eventName
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($eventId: ID!, $userId: ID!, $commentText: String!) {
    createComment(
      eventId: $eventId
      userId: $userId
      commentText: $commentText
    ) {
      _id
      commentText
      event {
        _id
        eventName
      }
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $eventName: String!
    $eventCategory: String!
    $eventDescription: String!
    $mainImg: String!
    $portraitImg: String!
    $tags: [String!]!
    $eventStartDate: String!
    $eventLocation: EventLocationInput!
    $eventType: String!
    $eventCapacity: Int!
    $eventInvitation: Boolean!
    $minAge: Int!
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
    ) {
      _id
      eventName
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($deleteCommentId: ID!) {
    deleteComment(id: $deleteCommentId) {
      _id
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($deleteEventId: ID!) {
    deleteEvent(id: $deleteEventId) {
      _id
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      _id
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation RemoveFriend($userId: ID!, $friendId: ID!) {
    removeFriend(userId: $userId, friendId: $friendId) {
      _id
    }
  }
`;

export const CANCEL_EVENT = gql`
  mutation CancelEvent($eventId: ID!) {
    unconfirmEvent(eventId: $eventId) {
      _id
      eventName
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($commentId: ID!, $commentText: String!) {
    updateComment(commentId: $commentId, commentText: $commentText) {
      _id
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $updateEventId: ID!
    $eventName: String!
    $eventCategory: String!
    $eventDescription: String!
    $mainImg: String!
    $portraitImg: String!
    $tags: [String!]!
    $eventStartDate: String!
    $eventLocation: EventLocationInput!
    $eventType: String!
    $eventCapacity: Int!
    $eventInvitation: Boolean!
    $minAge: Int!
    $createdBy: ID!
  ) {
    updateEvent(
      id: $updateEventId
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
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $updateUserId: ID!
    $username: String!
    $email: String!
    $dateOfBirth: String!
    $profilePic: String!
    $password: String!
  ) {
    updateUser(
      id: $updateUserId
      username: $username
      email: $email
      dateOfBirth: $dateOfBirth
      profilePic: $profilePic
      password: $password
    ) {
      _id
      username
    }
  }
`;
