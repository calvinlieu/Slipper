import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getComments } from "../../store/comment";
import { getTweets } from "../../store/tweet";
import "./CreateComment.css";

const CommentForm = ({ tweet }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const newErrors = [];
    if (content?.length > 280) {
      newErrors.push("Comment length of 280 characters exceeded!");
    }
    if (content.length < 4) {
        newErrors.push("Comment must be more than 4 characters!")
    }
    if (!content) {
      newErrors.push("Comment is required!");
    }
    if (newErrors.length) {
      setErrors(newErrors);
    } else {
      setErrors([]);
    }
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      user_id: user.id,
      tweet_id: tweet.id,
      content: content,
    };

    let newComment = await dispatch(createComment(payload));
    if (content.length < 4) {
      errors.push("Minimum of 4 characters required.");
      setErrors(errors);
    }

    dispatch(getComments(tweet.id));
    dispatch(getTweets())

    setContent("");
    return newComment;
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error) => (
          <li>{error}</li>
        ))}
      </ul>
      <input
        type="text"
        className="comment-input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tweet your reply"
        required
      />
      <button type="submit">Reply</button>
    </form>
  );
};

export default CommentForm
