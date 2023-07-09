import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
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
          eventDescription
          mainImg
        }
      }
      friends {
        username
        _id
      }
      assistingEvents {
        _id
        eventName
        eventDescription
        mainImg
      }
      createdEvents {
        _id
        eventName
        eventDescription
        eventCategory
        mainImg
        portraitImg
        tags
        eventStartDate
        eventLocation {
          address
          city
          country
          lat
          lon
        }
        eventCapacity
        minAge
      }
    }
  }
`;

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
        eventDescription
        mainImg
      }
      createdEvents {
        _id
        eventName
        eventDescription
        eventCategory
        mainImg
      }
    }
  }
`;

export const QUERY_ALL_EVENTS = gql`
  query allEvents {
    events {
      _id
      eventName
      eventDescription
      eventCategory
      mainImg
      createdBy {
        _id
        username
      }
      eventLocation {
        city
        country
      }
      eventStartDate
      usersAssisting {
        _id
        username
      }
      eventCapacity
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
      eventCategory
      eventCapacity
      mainImg
      portraitImg
      eventLocation {
        address
        city
        country
        lat
        lon
      }
      eventStartDate
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
  query allComments {
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
  }
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
