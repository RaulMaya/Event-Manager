import { gql } from "@apollo/client";

export const QUERY_COMMENTS = gql`
  query allComments {
    comments {
      _id
      commentText
      user {
        _id
        username
      }
    }
  }
`;

export const QUERY_COMMENT = gql`
  query getComment($id: ID!) {
    comment(id: $id) {
      _id
      commentText
      user {
        _id
        username
      }
    }
  }
`;

export const QUERY_EVENTS = gql`
  query allEvents {
    events {
      _id
      eventName
      eventDescription
      mainImg
      createdBy {
        _id
        username
      }
      eventLocation {
        city
        country
      }
      eventType
      eventStartDate
      eventCapacity
      eventInvitation
      minAge
    }
  }
`;

export const QUERY_EVENT = gql`
  query getEvent($id: ID!) {
    event(id: $id) {
      _id
      eventName
      eventDescription
      mainImg
      createdBy {
        _id
        username
      }
      eventLocation {
        city
        country
      }
      eventType
      eventStartDate
      eventCapacity
      eventInvitation
      minAge
      comments {
        _id
        commentText
        user {
          _id
          username
        }
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      createdEvents {
        _id
        eventName
      }
      assistingEvents {
        _id
        eventName
      }
      comments {
        _id
        commentText
        event {
          _id
          eventName
        }
      }
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      _id
      username
      createdEvents {
        _id
        eventName
      }
      assistingEvents {
        _id
        eventName
      }
      comments {
        _id
        commentText
        event {
          _id
          eventName
        }
      }
      friends {
        _id
        username
      }
    }
  }
`;
