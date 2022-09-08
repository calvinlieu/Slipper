import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTweets, updateTweetThunk } from "../../store/tweet";
import { deleteComment, getComments } from "../../store/comment";
import "./TweetDetails.css";
import EditCommentModal from "../EditComment";
import TweetOptionsModal from "../TweetOptions";

const TweetDetail = () => {
  const dispatch = useDispatch();
  let { tweetId } = useParams();
  const tweet = useSelector((state) => state?.tweets[tweetId]);
  const user = useSelector((state) => state?.session?.user);
  const comments = useSelector((state) => Object.values(state?.comments));
  const tweetComments = Object.values(comments).filter(
    (comment) => comment?.tweet === tweet?.id
  );

  useEffect(() => {
    dispatch(getTweets(tweetId));
    dispatch(getComments(tweetId));
  }, [dispatch, tweetId]);

  const handleDelete = async (commentId) => {
    await dispatch(deleteComment(commentId, tweetId));
    // dispatch(getComments(tweetId));
  };

  return (
    <div>
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
      <pre>{tweet?.description}</pre>
      {tweet.image_url && (
        <div className="imgDiv">
          <img className="image" alt="" src={tweet?.image_url}></img>
        </div>
      )}
      {tweetComments &&
        tweetComments.map((comments) => {
          return (
            <div key={comments?.id}>
              {comments?.user?.username} {`@${comments?.user?.username}`}
              {comments?.content}
              {comments?.user.id === user?.id && (
                <>
                  <div>
                    <EditCommentModal commentId={comments.id} />
                  </div>
                  <img
                    onClick={() => handleDelete(comments.id)}
                    className="comment-del-btn"
                    src="https://www.pngitem.com/pimgs/m/164-1649314_recycle-bin-delete-garbage-full-trash-can-icon.png"
                    alt=""
                  />
                </>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default TweetDetail;
