import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTweets, createTweet } from "../../store/tweet";
import { getComments } from "../../store/comment";
import CreateCommentModal from "../CreateComment";
import NavBar from "../NavBar/NavBar";
import TweetOptionsModal from "../TweetOptions";
import "./Feed.css";
import {
  removeLikeThunk,
  addLikeThunk,
  getTweetLikesThunk,
} from "../../store/like";

const Feed = () => {
  const tweets = useSelector((state) => Object.values(state.tweets));
  const user = useSelector((state) => state.session.user);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const comments = useSelector((state) => Object.values(state.comments));
  const dispatch = useDispatch();
  const sortedTweets = tweets.sort().reverse();

  useEffect(() => {
    dispatch(getTweets(tweets.id));
    dispatch(getComments(comments.id));
  }, [dispatch, tweets.id, comments.id]);

  const addLikePost = async (tweet, isLiked) => {
    const payload = {
      user_id: user.id,
      tweet_id: tweet.id,
    };

    await dispatch(addLikeThunk(payload));
    dispatch(getTweets());
    isLiked = true;
  };

  const removeLikePost = async (isLiked, likes) => {
    let likeId;
    Object.values(likes).forEach((like) => {
      if (like.user.id === user.id) {
        likeId = like.id;
      }
    });
    await dispatch(removeLikeThunk(likeId));
    dispatch(getTweets());
    isLiked = false;
  };

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

    dispatch(createTweet(payload));
    setDescription("");
    setImageUrl("");
    setErrors([]);
  };

  return (
    <div className="feed-main-container">
      <div className="feed-navbar">
        <NavBar />
      </div>
      <div className="tweets-feed">
        <div className="createTweetFeed">
          <div className="username-top-div">
            <div>
              <img
                className="profile-image"
                src="https://i.imgur.com/vF8FTS2.png"
                alt="Profile"
              />
            </div>
            <div className="">{user.username}</div>
            <div className="at-username">{`@${user.username}`}</div>
          </div>
          <div>
            <form className="create-tweet-form" onSubmit={handleSubmit}>
              <div className="whats-happening-div">
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
              <div className="img-form-tweet-container">
                <input
                  style={{ height: "25px", backgroundColor: "#15202B" }}
                  type="text"
                  placeholder="Image URL here... (Optional)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
            </form>
            {errors && (
              <ul className="create-tweet-form-errors">
                {errors.map((error) => {
                  return <div>{`${error}`}</div>;
                })}
              </ul>
            )}
            <div className="top-button-submit">
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
        {sortedTweets &&
          comments &&
          sortedTweets.map((tweet) => {
            let isLiked = false;
            let likes = tweet.like_list;
            Object.values(likes).forEach((like) => {
              if (like.user.id === user.id) {
                isLiked = true;
                return;
              }
            });
            return (
              <div key={tweet.id} id={tweet.id} className="each-tweet">
                <div className="tweet-username">
                  <div className="username-div">
                    <div>
                      <img
                        className="profile-image"
                        src="https://i.imgur.com/vF8FTS2.png"
                        alt="Profile"
                      />
                    </div>
                    <div className="username-div">{tweet.user.username}</div>
                    <div className="at-username">{`@${tweet.user.username}`}</div>
                  </div>
                  <div>
                    <TweetOptionsModal tweet={tweet} />
                  </div>
                </div>
                <NavLink to={`/tweets/${tweet.id}`} className="tweet-container">
                  <pre className="description">{tweet?.description}</pre>
                  {tweet.image_url && (
                    <div className="imgDiv">
                      <img
                        className="image"
                        alt=""
                        src={tweet?.image_url}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src =
                            "https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
                        }}
                      ></img>
                    </div>
                  )}
                </NavLink>
                <div className="comments-div">
                  <CreateCommentModal tweet={tweet} /> {tweet?.comments?.length}
                </div>
                <div className="like-button">
                  <div className="posts-likes">{tweet.likes}</div>
                  {likes && !isLiked ? (
                    <div
                      onClick={() => addLikePost(tweet, isLiked)}
                      className="fa-regular fa-heart fa-xl"
                    ></div>
                  ) : (
                    <i
                      style={{ color: "#ED4956" }}
                      onClick={() => removeLikePost(isLiked, likes)}
                      className="fa-solid fa-heart fa-xl"
                    ></i>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Feed;
