import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTweets } from "../../store/tweet";
import NavBar from "../NavBar/NavBar";
import TweetOptionsModal from "../TweetOptions";
import "./Feed.css";

const Feed = () => {
  const tweets = useSelector((state) => Object.values(state.tweets));
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  console.log(tweets, "tweet");
  console.log(user, "user");

  useEffect(() => {
    dispatch(getTweets());
  }, [dispatch]);

  return (
    <div className="feed-main-container">
      <div className="feed-navbar">
        <NavBar />
      </div>
      <div className="tweets-feed">
        <div className="createTweetFeed">What's happening?</div>
        {tweets &&
          tweets.map((tweet) => (
            <div key={tweet.id} id={tweet.id} className="each-tweet">
              <div className="username-tweet">
                <NavLink
                  className="tweet-username"
                  to={`/users/${tweet.user.id}`}
                >
                  {tweet.user.username} {`@${tweet.user.username}`}
                </NavLink>
                <TweetOptionsModal tweet={tweet} />
              </div>
              <NavLink to={`/tweets/${tweet.id}`} className="tweet-container">
                <div className="description">{tweet.description}</div>
                <div className="imgDiv">
                  <img className="image" alt="" src={tweet.image_url}></img>
                </div>
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Feed;
