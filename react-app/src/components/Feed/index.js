import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTweets } from "../../store/tweet";
import NavBar from "../NavBar/NavBar";
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
    <>
      <div className="feed-navbar">
        <NavBar />
      </div>
      <div className="tweets-feed">
        {tweets &&
          tweets.map((tweet) => (
            <div key={tweet.id} id={tweet.id} className="each-tweet">
              <div className="username-tweet">
                <div className="tweet-username" to={`/users/${tweet.user.id}`}>{tweet.user.username} {`@${tweet.user.username}`}</div>
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
    </>
  );
};

export default Feed;
