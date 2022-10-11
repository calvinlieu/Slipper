import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getProfileThunk } from "../../store/profile";
import { NavLink } from "react-router-dom";
import { getComments } from "../../store/comment";
import "./profile.css";
import "../Feed/Feed.css";
import TweetOptionsModal from "../TweetOptions";
import CreateCommentModal from "../CreateComment";
import {
  removeLikeThunk,
  addLikeThunk,
  getAllLikesThunk,
} from "../../store/like";
import { getAllProfileTweets } from "../../store/tweet";
import Likes from "../Likes/like";

const ProfilePage = () => {
  const user = useSelector((state) => state?.session.user);
  const userProfile = useSelector((state) => state?.profile);
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();
  const comments = useSelector((state) => Object.values(state.comments));
  const tweets = useSelector((state) => state.tweets);
  const likes = useSelector((state) => state.likes);
  const profileTweets = userProfile?.tweets?.sort((a,b) => a.id - b.id)


  console.log(profileTweets, "profile")


  useEffect(() => {
    dispatch(getProfileThunk(userId));
    dispatch(getAllLikesThunk());
  }, [dispatch, JSON.stringify(comments), JSON.stringify(likes), userId]);

  useEffect(() => {
    Object.values(likes).forEach((like) => {
      if (like.user.id === user.id) {
        return;
      }
    });
  }, [likes]);

  const addLikePost = async (tweet) => {
    const payload = {
      user_id: user.id,
      tweet_id: tweet.id,
    };

    dispatch(addLikeThunk(payload));
    dispatch(getProfileThunk(userId));
  };

  const removeLikePost = async (like) => {
    if (like === undefined) {
      return;
    }
    dispatch(removeLikeThunk(like));
  };

  return (
    <div className="user-profile">
      <div className="top-profile-username">{userProfile.profile?.username}</div>
      <div>{userProfile.tweets?.length} Tweets</div>
      <div className="profile-image-container">
        <img
          className="banner-picture"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg/1200px-Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg"
        ></img>
        <img
          className="profile-picture"
          src={userProfile.profile?.profile_image_url}
        ></img>
      </div>
      <div className="username-info-div">
        <div className="profile-username">{userProfile.profile?.username}</div>
        <div className="profile-at-username">@{userProfile.profile?.username}</div>
        <div className="profile-bio">{userProfile.profile?.bio}</div>
        <div className="profile-follow">
        <div>{userProfile.following_count} Following</div>
        <div className="profile-followers">{userProfile.follower_count} Followers</div>
        </div>
      </div>
      <div>
        {profileTweets?.map((tweet) => {
          const tweetIsLiked =
            Object.values(likes).find((like) => like.tweet_id === tweet.id) !==
            undefined;
          const numLikes = Object.values(likes).filter(
            (like) => like.tweet_id === tweet.id
          ).length;
          const foundLike = Object.values(likes).find(
            (like) => like.tweet_id === tweet.id
          );
          return (
            <div
              key={tweet.id}
              id={tweet.id}
              tweet={tweet}
              className="each-tweet"
            >
              <div className="tweet-username">
                <div className="username-div">
                  <div>
                    <img
                      className="profile-image"
                      src={tweet.user.profile_image_url}
                      alt="Profile"
                    />
                  </div>
                  <NavLink
                    to={`/users/${tweet.user.id}`}
                    className="username-div"
                  >
                    {tweet.user.username}
                  </NavLink>
                  <NavLink
                    to={`/users/${tweet.user.id}`}
                    className="at-username"
                  >{`@${tweet.user.username}`}</NavLink>
                </div>
                <div>
                  <TweetOptionsModal tweet={tweet} />
                </div>
              </div>
              <div className="tweet-div">
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
              </div>
              <div className="comments-div">
                <CreateCommentModal tweet={tweet} /> {tweet?.comments?.length}
                <div className="likes-div">
                  {!tweetIsLiked ? (
                    <div
                      onClick={() => addLikePost(tweet)}
                      className="fa-regular fa-heart"
                    ></div>
                  ) : (
                    <i
                      style={{ color: "rgb(249, 24, 128)" }}
                      onClick={() => removeLikePost(foundLike)}
                      className="fa-solid fa-heart"
                    ></i>
                  )}
                </div>
                <div className="posts-likes">{numLikes}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePage;
