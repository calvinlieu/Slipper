import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DeleteTweet from '../DeleteTweet/DeleteTweet';
import './TweetOptions.css'
import { useHistory } from 'react-router-dom';
import { updateTweetThunk } from '../../store/tweet';

function TweetOptions({ tweet, onClick }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    const goToPost = () => {
        history.push(`/posts/${tweet.id}`)
        onClick()
    }

    // const toggleComments = async () => {
    //     const payload = {
    //         user_id: user.id,
    //         description: tweet.description,
    //         image_url: tweet.image_url,
    //         display_comments: !tweet.display_comments
    //     }

    //     let updatedPost = await dispatch(updateTweetThunk(payload, tweet.id))
    //     if (updatedPost) {
    //         onClick()
    //     }
    // }

    const copyLink = (tweet) => {
        let copiedLink = `https://slipper-capstone.herokuapp.com/tweets/${tweet.id}`

        navigator.clipboard.writeText(copiedLink)
    }

    return (
        <div className='post-options-container'>
        {user && user.id == tweet.user.id ? (
            <>
            <DeleteTweet tweet={tweet}/>
            {/* <EditPostModal tweet={tweet} /> */}
            <div className='give-me-a-border' onClick={onClick} >Cancel</div>
            </>
        ) : (
            <>
            <div className='give-me-a-border top-option' onClick={goToPost} >Go to post</div>
            <div className='give-me-a-border' onClick={() => copyLink(tweet)} >Copy link</div>
            <div className='give-me-a-border cancel' onClick={onClick}>Cancel</div>
            </>
        )}
        </div>
    )
}

export default TweetOptions;
