import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTweets, updateTweetThunk } from "../../store/tweet";
import { deleteComment, getComments } from "../../store/comment";
import "./TweetDetails.css";
import EditCommentModal from "../EditComment";

const TweetDetail = () => {
  const dispatch = useDispatch();
  let { tweetId } = useParams();
  const tweet = useSelector((state) => state?.tweets[tweetId]);
  const user = useSelector((state) => state?.session?.user);
  const comments = useSelector((state) => Object.values(state?.comments));
  const tweetComments = Object.values(comments).filter(
    (comment) => comment?.tweet === tweet?.id
  );
  
  console.log(comments, "comments")

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
      <div>
        {tweet?.user?.username} {`@${tweet?.user?.username}`}
      </div>
      <div>{tweet?.description}</div>
      <div className="imgDiv">
        <img className="image" alt="" src={tweet?.image_url}></img>
      </div>
      {tweetComments &&
        tweetComments.map((comments) => (
          <div key={comments?.id}>
            {comments?.user?.username} {`@${comments?.user?.username}`}
            {comments?.content}
            {comments?.user.id === user.id && (
              <>
                <div>
                  <EditCommentModal />
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
        ))}
    </div>
  );
};

export default TweetDetail;
