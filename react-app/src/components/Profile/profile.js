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
  getTweetLikesThunk,
} from "../../store/like";
import { getAllProfileTweets, createTweet, getTweets } from "../../store/tweet";
import NavBar from "../NavBar/NavBar";

const ProfilePage = () => {
  const user = useSelector((state) => state?.session.user);
  const userProfile = useSelector((state) => state?.profile);
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const comments = useSelector((state) => Object.values(state.comments));
  const likes = useSelector((state) => state.likes);
  const tweets = useSelector((state) => (state.tweets));

  console.log(userProfile, "userProfile")
  console.log(tweets, "tweets")
  console.log(user, "user")

  useEffect(() => {
    dispatch(getComments(tweets.id));
    dispatch(getTweetLikesThunk(tweets.id));
  }, [dispatch, JSON.stringify(tweets), JSON.stringify(comments), isLiked]);

  useEffect(() => {
    dispatch(getProfileThunk(userId));
    dispatch(getAllProfileTweets(userId));
  }, [dispatch, userId, isLiked, JSON.stringify(comments)]);

  const addLikePost = async (tweet, isLiked) => {

    const payload = {
      user_id: user.id,
      tweet_id: tweet.id,
    };

    dispatch(addLikeThunk(payload));
    setIsLiked(prev => !prev);
  };

  const removeLikePost = async (likes_list) => { 
    let likeId;
    for (const like of likes_list) {
      if (like.user.id === user.id) {
        likeId = like.id
        break;  
      }
    }
    dispatch(removeLikeThunk(likeId));
    setIsLiked(prev => !prev);
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
          return (
            <div key={tweet.id} id={tweet.id} tweet={tweet} className="each-tweet">
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
                  {likes.user?.id === user?.id ? (
                    <div
                      onClick={() => addLikePost(tweet, isLiked)}
                      className="fa-regular fa-heart"
                    ></div>
                  ) : (
                    <i
                      style={{ color: "rgb(249, 24, 128)" }}
                      onClick={() => removeLikePost(tweet.like_list)}
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
