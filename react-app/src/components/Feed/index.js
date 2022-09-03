import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTweets } from "../../store/tweet";
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
      <div>
        {tweets &&
          tweets.map((tweet) => (
            <div key={tweet.id}>
              <div>
                <NavLink to={`/users/${tweet.user.id}`}></NavLink>
                {tweet.user.username}
              </div>
              <NavLink to={`/tweets/${tweet.id}`}>
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
