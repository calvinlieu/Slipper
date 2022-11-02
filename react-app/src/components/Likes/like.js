import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProfileTweets } from "../../store/tweet";
import { getTweetLikesThunk } from "../../store/like";

const Likes = ({ addLikePost, removeLikePost, tweet, user, likes, userProfile }) => {
  const [isLiked, setIsLiked] = useState(false);
 

  useEffect((e) => {
    userHasLiked();
    getAllProfileTweets()
    getTweetLikesThunk(tweet.id)
  }, [JSON.stringify(userProfile)]);

  const userHasLiked = () => {
    for (let i = 0; i < tweet.like_list.length; i++) {
      if (user.id === tweet.like_list[i].user_id) {
        setIsLiked(true);
        return;
      }
    }
  };


  return (
    <div className="likes-div">
      {!isLiked ? (
        <div
          onClick={() => {
            addLikePost(tweet);
            setIsLiked(true);
        }}
          className="fa-regular fa-heart"
        ></div>
      ) : (
        <i
          style={{ color: "rgb(249, 24, 128)" }}
          onClick={() => {
              removeLikePost(tweet.like_list);
              setIsLiked(false);
            }}
          className="fa-solid fa-heart"
        ></i>
      )}
    </div>
  );
};

export default Likes;
