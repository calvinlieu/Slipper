const GET_TWEET_LIKES = "likes/get-tweet-likes"
const ADD_LIKE = "likes/add-like"
const REMOVE_LIKE = "likes/remove-like"


const getTweetLikes = (likes) => {
    return {
        type: GET_TWEET_LIKES,
        likes
    }
}

const addLike = (like) => {
    return {
        type: ADD_LIKE,
        like
    }
}

const removeLike = (likeId) => {
    return {
        type: REMOVE_LIKE,
        likeId
    }
}

export const getTweetLikesThunk = (tweetId) => async dispatch => {
    const res = await fetch(`/api/likes/tweets/${tweetId}`)

    if (res.ok) {
        const likes = await res.json();
        dispatch(getTweetLikes(likes))
        return likes
    }
}

export const addLikeThunk = (payload) => async dispatch => {
    const res = await fetch('/api/likes/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })

    if (res.ok) {
        const like = await res.json()
        dispatch(addLike(like))
        return like
    }
}

export const removeLikeThunk = (likeId) => async dispatch => {
    const res = await fetch(`/api/likes/${likeId}`, { method: 'DELETE' })

    if (res.ok) {
        dispatch(removeLike(likeId))
    }
}

export default function likesReducer(state = {}, action) {
    switch (action.type) {
        case GET_TWEET_LIKES: {
            let newState = {}
            action.likes.likes.forEach(like => newState[like.id] = like)
            return newState
        }
        case ADD_LIKE: {
            let newState = {...state}
            newState[action.like.id] = action.like
            return newState
        }
        case REMOVE_LIKE: {
            let newState = {...state}
            delete newState[action.likeId]
            return newState
        }
        default:
            return state
    }
}