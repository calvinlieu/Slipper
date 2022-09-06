import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTweets } from "../../store/tweet";

const TweetDetail = () => {
  const dispatch = useDispatch();
  let { tweetId } = useParams();
  const tweet = useSelector((state) => state.tweets[tweetId]);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getTweets(tweetId));
  }, [dispatch, tweetId]);

  return (
    <div>
      <div>{tweet.user.username} {`@${tweet.user.username}`}</div>
      <div>{tweet.description}</div>
      <div className="imgDiv">
        <img className="image" alt="" src={tweet.image_url}></img>
      </div>
    </div>
  );
};

export default TweetDetail;
