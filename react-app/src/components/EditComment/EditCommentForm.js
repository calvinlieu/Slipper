import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editComment, getComments } from "../../store/comment";

function EditCommentForm({ commentId, onClick }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const user = useSelector((state) => state?.session.user);
  const comment = useSelector((state) => state?.comments);
  const tweet = useSelector((state) => state?.tweets)
  const [content, setContent] = useState(comment?.content || " ");
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    const newErrors = [];
    if (content?.length > 280) {
      newErrors.push("Comment length of 280 characters exceeded!");
    }
    if (content?.length < 4) {
      newErrors.push("Comment must be more than 4 characters!");
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
      content: content,
    };

    dispatch(editComment(payload, commentId));
    // dispatch(getComments(commentId));

    onClick()
  };

  return (
    <form className="edit-comment-form" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error) => (
          <li key={error.id}>{error}</li>
        ))}
      </ul>
      <input
        type="text"
        className="comment-input"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Edit your comment"
        required
      />
      <button type="submit">Edit</button>
    </form>
  );
}

export default EditCommentForm;
