import { gql } from "@apollo/client";

export const QUERY_ALL_USERS = gql`
  query allUsers {
    users {
      _id
      username
      email
      dateOfBirth
      profilePic
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(id: $userId) {
      _id
      username
      email
      password
      dateOfBirth
      profilePic
      comments {
        commentText
        event {
          _id
          eventName
        }
      }
      friends {
        username
        _id
      }
      assistingEvents {
        _id
        eventName
      }
      createdEvents {
        _id
        eventName
      }
    }
  }
`;

export const QUERY_ALL_EVENTS = gql`
  query allEvents {
    events {
      _id
      eventName
      mainImg
      createdBy {
        _id
        username
      }
      eventStartDate
      eventInvitation
      minAge
    }
  }
`;

export const QUERY_SINGLE_EVENT = gql`
  query singleEvent($eventId: ID!) {
    event(id: $eventId) {
      _id
      eventName
      eventDescription
      eventCapacity
      mainImg
      portraitImg
      eventLocation {
        address
        city
        country
        state
        lat
        lon
      }
      eventStartDate
      eventType
      eventInvitation
      minAge
      tags
      createdBy {
        _id
        username
      }
      createdAt
      usersAssisting {
        _id
        username
      }
      comments {
        _id
        user {
          _id
          username
        }
        commentText
        createdAt
      }
    }
  }
`;

export const QUERY_ALL_COMMENTS = gql`
  query allComments{
    comments {
      _id
      commentText
      createdAt
      user {
        _id
        username
      }
      event {
        _id
        eventName
      }
    }
  }f
`;

export const QUERY_SINGLE_COMMENT = gql`
  query singleComment($commentId: ID!) {
    comment(id: $commentId) {
      _id
      commentText
      createdAt
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
