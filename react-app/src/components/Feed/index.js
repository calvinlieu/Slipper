import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getTweets, createTweet } from "../../store/tweet";
import { getComments } from "../../store/comment";
import CreateCommentModal from "../CreateComment";
import NavBar from "../NavBar/NavBar";
import TweetOptionsModal from "../TweetOptions";
import "./Feed.css";

const Feed = () => {
  const tweets = useSelector((state) => Object.values(state.tweets));
  let { tweetId } = useParams();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      user_id: user.id,
      description: description,
      image_url: imageUrl,
    };

    await dispatch(createTweet(payload));

    setDescription("");
    setImageUrl("")
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
              {errors && (
                <ul className="create-tweet-form-errors">
                  {errors.map((error) => {
                    return <li>{`${error}`}</li>;
                  })}
                </ul>
              )}
              <div className="whats-happening-div">
                <textarea
                  style={{ backgroundColor: "#15202B" }}
                  type="text"
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
            <div className="top-button-submit">
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
        {sortedTweets &&
          comments &&
          sortedTweets.map((tweet) => (
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
                  <div className="">{tweet.user.username}</div>
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
                    <img className="image" alt="" src={tweet?.image_url}></img>
                  </div>
                )}
              </NavLink>
              <div className="comments-div">
                <CreateCommentModal tweet={tweet} /> {tweet?.comments?.length}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Feed;
