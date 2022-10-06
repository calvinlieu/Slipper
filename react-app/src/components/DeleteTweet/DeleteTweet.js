import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteTweetThunk } from "../../store/tweet";

function DeleteTweet({ tweet, onClick }) {
  let dispatch = useDispatch();
  let history = useHistory();

  const onDelete = () => {
    dispatch(deleteTweetThunk(tweet.id));
  };

  return (
    <div className="delete-post">
      <div className="delete-head">
        <h3 className="delete-top-modal">Delete post?</h3>
        <div className="confirmation-delete-msg">
          Are you sure you want to delete this tweet?
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

export default DeleteTweet;
