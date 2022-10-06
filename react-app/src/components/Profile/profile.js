import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getProfileThunk } from "../../store/profile";
import { NavLink } from "react-router-dom";
import { getComments } from "../../store/comment";
import "./profile.css";
import "../Feed/Feed.css"
import TweetOptionsModal from "../TweetOptions";
import CreateCommentModal from "../CreateComment";
import {
  removeLikeThunk,
  addLikeThunk,
  getTweetLikesThunk,
} from "../../store/like";
import { getAllProfileTweets, createTweet, getTweets } from "../../store/tweet";
import NavBar from "../NavBar/NavBar";

const ProfilePage = () => {
  const user = useSelector((state) => state?.session.user);
  const userProfile = useSelector((state) => state?.profile);
  const tweets = useSelector((state) => Object.values(state.tweets));
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const comments = useSelector((state) => Object.values(state.comments));
  const likes = useSelector((state) => state.likes);

  console.log(userProfile, )


  useEffect(() => {
    dispatch(getProfileThunk(userId));
    dispatch(getAllProfileTweets(userId));
    dispatch(getComments(tweets.id));
    dispatch(getTweetLikesThunk(tweets.id));
    if (userProfile === undefined) {
      history.push("/");
    }
  }, [dispatch, JSON.stringify(tweets), userId, JSON.stringify(comments), isLiked]);
  

  const addLikePost = async (tweet) => {
    const payload = {
      user_id: user.id,
      tweet_id: tweet.id,
    };
    dispatch(addLikeThunk(payload));
    setIsLiked(true)
  };

  const removeLikePost = async (isLiked, likes) => {
    let likeId;
    Object.values(likes).forEach((like) => {
      if (like.user.id === user.id) {
        likeId = like.id;
      }
    });
    await dispatch(removeLikeThunk(likeId));
    setIsLiked(false)
  };

  return (
    <div className="user-profile">
      <div>{userProfile.tweets?.length} Tweets</div>
      <img
        className="banner-picture"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg/1200px-Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg"
      ></img>
      <img
        className="profile-picture"
        src={userProfile.profile?.profile_image_url}
      ></img>
      <div>{userProfile.profile?.username}</div>
      <div>@{userProfile.profile?.username}</div>
      <div>
        {userProfile.tweets?.map((tweet) => {
          let likes = tweet.like_list;
          return (
            <div key={tweet.id} id={tweet.id} className="each-tweet">
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
                  {!isLiked ? (
                    <div
                      onClick={() => addLikePost(tweet, isLiked)}
                      className="fa-regular fa-heart"
                    ></div>
                  ) : (
                    <i
                      style={{ color: "rgb(249, 24, 128)" }}
                      onClick={() => removeLikePost(isLiked, likes)}
                      className="fa-solid fa-heart"
                    ></i>
                  )}
                </div>
                <div className="posts-likes">{tweet.likes}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePage;
