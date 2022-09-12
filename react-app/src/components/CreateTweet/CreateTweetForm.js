import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createTweet } from "../../store/tweet";
import "./CreateTweet.css";

function CreateTweetForm({ onClick }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // useEffect(() => {
  //   const errors = [];
  //   const imgRegex = new RegExp(
  //     /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/
  //   );
  //   if (imageUrl && !imgRegex.test(imageUrl)) {
  //     errors.push(
  //       "Invalid Image Url! URL must contain a .png, .jpg, .jpeg, .gif, .png or .svg!"
  //     );
  //   }
  //   setErrors(errors);
  // }, [imageUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imgRegex = new RegExp(
      /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/
    );
    if (imageUrl && !imgRegex.test(imageUrl)) {
      setErrors([
        "Invalid Image Url! URL must contain a .png, .jpg, .jpeg, .gif, .png or .svg!",
      ]);
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
      setErrors([
        "Tweet length of 280 characters exceeded, current character count: 281",
      ]);
      return;
    }
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
            <div>
              {user.username} {`@${user.username}`}
            </div>
          </div>
          <form className="create-post-form" onSubmit={handleSubmit}>
            {errors && (
              <ul className="create-post-form-errors">
                {errors.map((error) => {
                  return <div>{`${error}`}</div>;
                })}
              </ul>
            )}
            <div className="caption-div">
              <textarea
                style={{ backgroundColor: "#15202B" }}
                type="text"
                maxLength="281"
                placeholder="What's happening?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="img-form-container">
              <input
                style={{ height: "25px", backgroundColor: "#15202B" }}
                type="text"
                placeholder="Image URL here..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
          </form>
          <div className="buttonContainer">
            <button
              onClick={handleSubmit}
              className="create-post-btn"
              type="submit"
              // disabled={errors.length > 0}
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
