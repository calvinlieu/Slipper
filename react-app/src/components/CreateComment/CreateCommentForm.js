import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getComments } from "../../store/comment";
import { getTweets } from "../../store/tweet";
import "./CreateComment.css";


const CommentForm = ({ tweet, onClick }) => {
  const dispatch = useDispatch();
  
  const user = useSelector((state) => state.session.user);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) {
      setErrors(["Comment is required!"]);
      return;
    }

    if (content && content.trim().length === 0) {
      setErrors(["Comment is required!"]);
      return;
    }

    if (content.length > 280) {
      setErrors(["Comment length of 280 characters exceeded!"]);
      return;
    }

    if (content.length < 4) {
      setErrors(["Comment must be more than 4 characters!"]);
      return;
    }

    const payload = {
      user_id: user.id,
      tweet_id: tweet.id,
      content: content,
    };

    onClick();
    let newComment = await dispatch(createComment(payload));
    if (newComment) {
      dispatch(getComments(tweet.id));
      dispatch(getTweets());
      setContent("");
      onClick();
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="create-comment-errors">
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div className="comment-header">Tweet your reply</div>
      <div className="comment-textarea">
        <textarea
          type="textarea"
          maxLength="281"
          className="comment-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tweet your reply"
          required
        />
        <div className="reply-btn-div">
          <button className="reply-btn" type="submit" onClick={handleSubmit}>
            Reply
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
