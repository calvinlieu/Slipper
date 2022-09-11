import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateTweetThunk } from "../../store/tweet";
import "./EditTweet.css";

function EditTweetForm({ tweet, onClick }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [description, setDescription] = useState(tweet?.description);
  const [imageUrl, setImageUrl] = useState(tweet?.image_url);
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {

    const error = []
    if (description.length < 0) {
        error.push(["Tweet is required!"])
    }
    setErrors(error)
  }, [description])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.length > 0) {
      return;
    }

    if (!description) {
      setErrors(["Tweet is required!"]);
      return;
    }
    if (description && description.trim().length === 0) {
      setErrors(["Tweet is required!"]);
      return;
    }

    if (description.length > 280) {
        setErrors(["Comment length of 280 characters exceeded, current character count: 281"])
        return;
    }

    const payload = {
      user_id: user.id,
      description,
      image_url: imageUrl,
    };

    let updatedTweet = await dispatch(updateTweetThunk(payload, tweet.id));
    if (updatedTweet) {
      history.push(`/tweets/${tweet.id}`);
    }

    onClick();
  };
  return (
    <div className="edit-post-container">
      <div className="edit-post-top-bar">
        <div className="cancel-btn"onClick={() => onClick()}>Cancel</div>
        <div style={{ "font-weight": "bold" }}>Edit Tweet</div>
        <button
          onClick={handleSubmit}
          className="edit-post-submit-button"
          type="submit"
        >
          Edit
        </button>
      </div>
      <div className="main-edit-container">
        <div className="right-edit-container">
          <form className="edit-post-form-container" onSubmit={handleSubmit}>
            {errors && (
              <>
                {errors.map((error) => {
                  return (
                    <div className="edit-post-form-errors">{`${error}`}</div>
                  );
                })}
              </>
            )}
            <div className="post-caption-edit">
              <textarea
                placeholder="Write a Tweet"
                maxLength="281"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTweetForm;
