import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTweets } from "../../store/tweet";
import { deleteComment, getComments } from "../../store/comment";
import "./TweetDetails.css";
import EditCommentModal from "../EditComment";
import TweetOptionsModal from "../TweetOptions";
import NavBar from "../NavBar/NavBar";
import CreateCommentModal from "../CreateComment";
import {
  removeLikeThunk,
  addLikeThunk,
  getTweetLikesThunk,
} from "../../store/like";

const TweetDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { tweetId } = useParams();
  const tweets = useSelector((state) => state.tweets);
  const tweet = useSelector((state) => state.tweets[tweetId]);
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state?.session?.user);
  const comments = useSelector((state) => Object.values(state?.comments));
  const tweetComments = Object.values(comments).filter(
    (comment) => comment?.tweet === tweet?.id
  );
  const tweetString = JSON.stringify(tweets);
  const [isLiked, setIsLiked] = useState(false);
  const likes = useSelector((state) => state.likes);

  useEffect(() => {
    dispatch(getTweets(tweetId));
    dispatch(getComments(tweetId));
    dispatch(getTweetLikesThunk(tweetId));
    setIsLoaded(true);
    if (isLoaded && tweets && tweets[tweetId] === undefined) {
      history.push("/");
    }
  }, [dispatch, tweetString, tweetId]);

  useEffect(() => {
    Object.values(likes).forEach((like) => {
      if (like.user.id === user.id) {
        setIsLiked(true);
        return;
      }
    });
  }, [likes, user.id]);

  const handleDelete = async (commentId) => {
    await dispatch(deleteComment(commentId, tweetId));
    await dispatch(getComments(tweetId));
  };

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
    setIsLiked(false);
  };

  return (
    <div className="tweet-main-container">
      <div className="individual-tweet-navbar">
        <NavBar />
      </div>
      <div className="tweet-details">
        <div className="tweet-user-info">
          <div className="username-div-info">
            <div>
              <img
                className="profile-image"
                src="https://i.imgur.com/vF8FTS2.png"
                alt="Profile"
              />
            </div>
            <div className="">{tweet?.user?.username}</div>
            <div className="individual-username">{`@${tweet?.user?.username}`}</div>
          </div>
          <div className="options-modal">
            <TweetOptionsModal tweet={tweet} />
          </div>
        </div>
        <pre className="tweet-description">{tweet?.description}</pre>
        {tweet?.image_url && (
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
        <div className="comments-div">
          <CreateCommentModal tweet={tweet} /> {tweet?.comments?.length}
          <div className="likes-div">
            {likes && !isLiked ? (
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
          <div className="tweet-likes">{tweet?.likes}</div>
        </div>
        <div className="comments-section">
          {tweetComments &&
            tweetComments.map((comments) => {
              return (
                <div className="each-comment" key={comments?.id}>
                  <div className="comment-user-div">
                    <div>
                      <img
                        className="profile-image"
                        src="https://i.imgur.com/vF8FTS2.png"
                        alt="Profile"
                      />
                    </div>
                    <div className="individual-name-comments">
                      {comments?.user?.username}
                    </div>
                    <div className="individual-username">{`@${comments?.user?.username}`}</div>

                    <div className="comment-functions">
                      {comments?.user.id === user?.id && (
                        <>
                          <div>
                            <EditCommentModal commentId={comments.id} />
                          </div>
                          <img
                            onClick={() => handleDelete(comments.id)}
                            className="comment-del-btn"
                            src="https://cdn-icons-png.flaticon.com/512/3300/3300464.png"
                            alt=""
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <div className="user-comments">{comments?.content}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TweetDetail;
