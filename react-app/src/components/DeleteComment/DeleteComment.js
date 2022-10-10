import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {deleteComment, getComments} from "../../store/comment"
import { getTweets } from "../../store/tweet";
import "./DeleteComment.css"

function DeleteComment({ comment, tweet, onClick }) {
  let dispatch = useDispatch();
  let history = useHistory();

  const onDelete = () => {
    dispatch(deleteComment(comment));
    dispatch(getComments(tweet))
    dispatch(getTweets(tweet))
  };

  return (
    <div className="delete-post">
      <div className="delete-head">
        <h3 className="delete-top-modal">Delete Comment?</h3>
        <div className="confirmation-delete-msg">
          Are you sure you want to delete this comment?
        </div>
      </div>
      <div className="delete-btns-outer">
        <div className="delete-option cancel" onClick={onClick}>
          Cancel
        </div>
        <div className="delete-option delete-button" onClick={onDelete}>
          Delete
        </div>
      </div>
    </div>
  );
}

export default DeleteComment;
