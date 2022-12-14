import React from 'react'
import { useSelector } from 'react-redux'
import './TweetOptions.css'
import { useHistory } from 'react-router-dom';
import EditTweetModal from '../EditTweet/index'
import DeleteTweetModal from '../DeleteTweet';

function TweetOptions({ tweet, onClick }) {
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    const goToPost = () => {
        history.push(`/tweets/${tweet.id}`)
        onClick()
    }

    const copyLink = (tweet) => {
        let copiedLink = `https://slipper-capstone.herokuapp.com/tweets/${tweet.id}`
        navigator.clipboard.writeText(copiedLink)
    }

    return (
        <div className='post-options-container'>
        {user && user.id === tweet.user.id ? (
            <>
            <DeleteTweetModal tweet={tweet}/>
            <EditTweetModal tweet={tweet} />
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
