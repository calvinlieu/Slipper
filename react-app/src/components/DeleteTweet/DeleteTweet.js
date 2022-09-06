import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteTweetThunk } from "../../store/tweet";

function DeleteTweet({ tweet, onClick }) {
    let dispatch = useDispatch();
    let history = useHistory();

    const onDelete = () => {
        dispatch(deleteTweetThunk(tweet.id))
        history.push('/')
    }

    return (
        <div className="delete-post">
            <div className="delete-head">
                <h3>Delete post?</h3>
                <div>Are you sure you want to delete this tweet?</div>
            </div>
            <div className="delete-option delete-button" onClick={onDelete}>Delete</div>
            <div className="delete-option cancel" onClick={onClick}>Cancel</div>
        </div>
    )
}

export default DeleteTweet
