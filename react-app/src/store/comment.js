const ADD_COMMENT = "comments/ADD_COMMENT";
const LOAD_COMMENTS = "comments/LOAD_COMMENTS";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
const REMOVE_COMMENT = "comments/REMOVE_COMMENT";

const add = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

const load = (comments, tweetId) => ({
  type: LOAD_COMMENTS,
  comments,
  tweetId,
});

const update = (comment, commentId) => ({
  type: UPDATE_COMMENT,
  comment,
  commentId
});

const remove = (commentId) => ({
  type: REMOVE_COMMENT,
  commentId,
});

export const getComments = (tweetId) => async (dispatch) => {
  const response = await fetch(`/api/tweets/${tweetId}/comments`);

  if (response.ok) {
    const comments = await response.json();
    dispatch(load(comments, tweetId));
  } 
};

export const createComment = (data) => async (dispatch) => {
  const { content, user_id, tweet_id } = data;

  const formData = new FormData();

  formData.append("content", content);
  formData.append("user_id", user_id);
  formData.append("tweet_id", tweet_id);

  const response = await fetch(`/api/tweets/${data.tweet_id}/comments`, {
    method: "POST",
    body: formData,
  });
  const newComment = await response.json();

  dispatch(add(newComment));
  return newComment;
};

export const editComment = (payload, commentId) => async(dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
      })
      
    if (response.ok) {
        const editedComment = await response.json();
        dispatch(update(editedComment));
        return editedComment
    }
}

//delete a tweet
export const deleteComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(remove(commentId));
  }
};


const initialState = {};

const commentReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case LOAD_COMMENTS: {
            const newState = {};
            action.comments.comments.forEach((comment) => {newState[comment.id] = comment});
            return newState;
        }
        case ADD_COMMENT: {
            let newState = {...state};
            newState[action.comment.id] = action.comment;
            return newState;
        }
        case UPDATE_COMMENT: {
            let newState = {...state};
            newState[action.comment.id] = action.comment;
            return newState;
        }
        case REMOVE_COMMENT: {
            newState = {...state};
            delete newState[action.commentId];
            return newState;
        }
        default:
            return state;
    }
}

export default commentReducer