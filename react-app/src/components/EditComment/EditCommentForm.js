import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editComment } from "../../store/comment";
import "./EditComment.css"

function EditCommentForm({ commentId, onClick }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session.user);
  const comment = useSelector((state) => state?.comments);
  const tweet = useSelector((state) => state?.tweets);
  const [content, setContent] = useState(comment[commentId].content);
  const [errors, setErrors] = useState([]);


  // useEffect(() => {
  //   const newErrors = [];
  //   if (content?.length > 280) {
  //     newErrors.push("Comment length of 280 characters exceeded!");
  //   }
  //   if (content?.length < 4) {
  //     newErrors.push("Comment must be more than 4 characters!");
  //   }
  //   if (!content) {
  //     newErrors.push("Comment is required!");
  //   }
  //   if (newErrors.length) {
  //     setErrors(newErrors);
  //   } else {
  //     setErrors([]);
  //   }
  // }, [content]);


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
      content: content,
      tweet_id: tweet.id,
    };

    dispatch(editComment(payload, commentId));

    onClick();
  };

  return (
    <form className="edit-comment-form" onSubmit={handleSubmit}>
      <div className="edit-comment-errors">
        {errors.map((error, idx) => (
          <div key={idx}>{error}</div>
        ))}
      </div>
      <div className="edit-comment-header">Edit your comment</div>
      <div className="edit-comment-textarea">
        <textarea
          type="textarea"
          maxLength="281"
          className="edit-comment-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Edit your comment"
          required
        />
        <div className="edit-btn-div">
          <button className="edit-btn" type="submit" onClick={handleSubmit}>
            Edit
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditCommentForm;
