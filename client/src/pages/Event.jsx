import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_EVENT } from '../utils/queries';
import { CREATE_COMMENT } from '../utils/mutations';

const SingleEvent = () => {
  const [commentText, setCommentText] = useState('');
  const { id } = useParams();
  const { loading, error, data } = useQuery(QUERY_EVENT, {
    variables: { id: id },
  });
  const [createComment, { error: mutationError }] = useMutation(CREATE_COMMENT);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      await createComment({
        variables: {
          eventId: id,
          userId: 'hardCodedUserId',
          commentText,
        },
      });

      setCommentText('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (mutationError) {
      console.error(mutationError);
    }
  }, [mutationError]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const event = data.event;

  return (
    <div className="container mt-4">
      <div className="card">
        <img src={event.mainImg} className="card-img-top" alt={event.eventName} />
        <div className="card-body">
          <h2 className="card-title">{event.eventName}</h2>
          <p className="card-text">{event.eventDescription}</p>
          <p><strong>Location:</strong> {event.eventLocation.city}, {event.eventLocation.country}</p>
          <p><strong>Type:</strong> {event.eventType}</p>
          <p><strong>Start Date:</strong> {new Date(event.eventStartDate).toLocaleDateString()}</p>
          <p><strong>Capacity:</strong> {event.eventCapacity}</p>
          <p><strong>Minimum Age:</strong> {event.minAge}</p>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-body">
          <h3 className="card-title">Comments</h3>
          {event.comments.map((comment) => (
            <p key={comment._id} className="card-text">
              <strong>{comment.user.username}:</strong> {comment.commentText}
            </p>
          ))}
          <form onSubmit={handleCommentSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment"
                required
              />
              <button className="btn btn-primary" type="submit">Submit Comment</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
