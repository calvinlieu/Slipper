const GET_ALL_TWEETS = "tweets/get-user-tweets"
const UPDATE_TWEET = "tweets/update-tweet"
const CREATE_TWEET = "tweets/create-tweet"
const DELETE_TWEET = "tweets/delete-tweet"
const GET_PROFILE_TWEETS = "tweets/get-profile-tweets"

const addTweet = (tweet) => {
    return {
        type: CREATE_TWEET,
        tweet
    }
}

const getAllTweets = (allTweets) => {
    return {
        type: GET_ALL_TWEETS,
        allTweets
    }
}

const getProfileTweets = (userId) => {
    return {
        type: GET_PROFILE_TWEETS,
        userId
    }
}
const updateTweet = (tweet) => {
    return {
        type: UPDATE_TWEET,
        tweet
    }
}

const deleteTweet = (tweetId) => {
    return {
        type: DELETE_TWEET,
        tweetId
    }
}

//create tweet thunk
export const createTweet = data => async(dispatch) => {
    const {
        description,
        image_url,
        user_id
    } = data

    const formData = new FormData()
    formData.append('description', description)
    formData.append('image_url', image_url)
    formData.append('user_id', user_id)

    const response = await fetch(`/api/tweets/`, {
        method: 'POST',
        body: formData
    });
    const newTweet = await response.json()
    dispatch(addTweet(newTweet))
    return newTweet
}

//get all profile tweets
export const getAllProfileTweets = (userId) => async(dispatch) => {
    const response = await fetch(`/api/tweets/profile/${userId}`)
    if (response.ok) {
        const tweet = await response.json();
        dispatch(getProfileTweets(tweet))
        const all = {};
        tweet.tweets.forEach((tweet) => all[tweet.id] = tweet)
        return {...all}
    }

    return {}
}

//get all tweets
export const getTweets = () => async(dispatch) => {
    const response = await fetch(`/api/tweets/`)
    if (response.ok) {
        const tweet = await response.json();
        dispatch(getAllTweets(tweet))
        const all = {};
        tweet.tweets.forEach((tweet) => all[tweet.id] = tweet)
        return {...all}
    }

    return {}
}

//update tweet
export const updateTweetThunk = (payload, tweetId) => async(dispatch) => {
    const response = await fetch(`/api/tweets/${tweetId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })

    if(response.ok) {
        const tweet = await response.json();
        dispatch(updateTweet(tweet))
        return tweet
    }
}

export const deleteTweetThunk = (tweetId) => async(dispatch) => {
    const response = await fetch(`/api/tweets/${tweetId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deleteTweet(tweetId))
    }
}

const initialState = {};
const tweetReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_ALL_TWEETS: {
            const tweets = {};
            action.allTweets.tweets.forEach((tweet) => tweets[tweet.id] = tweet)
            return tweets
        }
        case GET_PROFILE_TWEETS: {
            const tweets = {};
            action.userId.tweets.forEach((tweet) => tweets[tweet.id] = tweet)
            return tweets
        }
        case CREATE_TWEET: {
            let newState = {...state}
            newState[action.tweet.id] = action.tweet;
            return newState
        }
        case UPDATE_TWEET: {
            newState = {...state};
            newState[action.tweet.id] = action.tweet;
            return newState
        }
        case DELETE_TWEET: {
            newState = {...state}
            delete newState[action.tweetId]
            return newState
        }
        default:
            return state;
    }
}

export default tweetReducer

