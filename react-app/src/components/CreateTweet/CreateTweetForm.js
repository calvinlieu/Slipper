import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createTweet } from "../../store/tweet";
import "./CreateTweet.css"

function CreateTweetForm({ onClick }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const newErrors = [];
    if (description?.length > 280) {
      newErrors.push("Tweet length of 280 characters exceeded");
    }
    if (!description) {
      newErrors.push("Tweet is required!");
    }
    if (newErrors.length) {
      setErrors(newErrors);
    } else {
      setErrors([]);
    }
  }, [description]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      user_id: user.id,
      description: description,
      image_url: imageUrl,
    };

    onClick();
    let updatedPost = await dispatch(createTweet(payload));
    if (updatedPost) {
      history.push(`/`);
      onClick();
    }
  };

  return (
    <div className="create-post-form-container">
      <div className="create-post-top-bar">
        <button className="cancel-button" onClick={() => onClick()}>
          x
        </button>
      </div>
      <div className="create-img-container">
        <div className="post-form">
          <div className="user-post-info">
            {user.profile_image_url ? (
              <img
                className="user-post-image"
                src="https://i.imgur.com/vF8FTS2.png"
                alt=""
              />
            ) : (
              <img
                className="user-post-image"
                src="https://i.imgur.com/vF8FTS2.png"
                alt="Profile"
              />
            )}
            <div>{user.username}</div>
          </div>
          <form className="create-post-form" onSubmit={handleSubmit}>
            {errors && (
              <ul className="create-post-form-errors">
                {errors.map((error) => {
                  return <li>{`${error}`}</li>;
                })}
              </ul>
            )}
            {/* <div>
              <label>Image:</label>
              <input
                // type="file"
                type="text"
                placeholder="Image URL here..."
                value={imageUrl}
                // onChange={() => previewFile()}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div> */}
            <div className="caption-div">
              <input
                type="textarea"
                placeholder="What's happening?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </form>
          <div className="buttonContainer">
          <button
            onClick={handleSubmit}
            className="create-post-btn"
            type="submit"
            disabled={errors.length > 0}
          >
            Tweet
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTweetForm;
