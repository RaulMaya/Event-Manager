import { gql } from "@apollo/client";

export const CREATE_USER = gql``;

export const LOGIN = gql``;

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
  mutation AssistEvent($userId: ID!, $eventId: ID!) {
    assistEvent(userId: $userId, eventId: $eventId) {
      _id
      eventName
    }
  }
`;

export const CREATE_COMMENT = gql``;

export const CREATE_EVENT = gql``;

export const DELETE_COMMENT = gql``;

export const DELETE_EVENT = gql``;

export const DELETE_USER = gql``;

export const REMOVE_FRIEND = gql``;

export const CANCEL_EVENT = gql``;

export const UPDATE_COMMENT = gql``;

export const UPDATE_EVENT = gql``;

export const UPDATE_USER = gql``;
