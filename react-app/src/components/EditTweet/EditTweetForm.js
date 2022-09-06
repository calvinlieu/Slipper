import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateTweetThunk } from '../../store/tweet'
import "./EditTweet.css"


function EditTweetForm({ tweet, onClick }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [ description, setDescription ] = useState(tweet?.description)
    const [ imageUrl, setImageUrl ] = useState(tweet?.image_url)
    const [errorValidators, setErrorValidators] = useState([]);
    const user = useSelector(state => state.session.user)


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            user_id: user.id,
            description,
            image_url: imageUrl
        }

        let updatedTweet = await dispatch(updateTweetThunk(payload, tweet.id))
        if (updatedTweet) {
            history.push(`/`)
        }

        onClick()
    }
    return (
        <div className="edit-post-container">
            <div className="edit-post-top-bar">
                <div onClick={() => onClick()}>Cancel</div>
                <div style={{'font-weight': 'bold'}}>Edit Tweet</div>
                <button onClick={handleSubmit} className='edit-post-submit-button' type='submit'>Done</button>
            </div>
            <div className="main-edit-container">
                <div className="left-edit-container">
                    <img className='edit-img' src={imageUrl} alt=""/>
                </div>

                <div className="right-edit-container">
                    <form className='edit-post-form-container' onSubmit={handleSubmit}>
                        <div className="user-info-modal">
                            {tweet?.user?.profile_image_url ? (
                                <img className='user-post-image' src={tweet.user.profile_image_url} alt="" />
                            ) : (
                                <img className='user-post-image' src="https://i.imgur.com/vF8FTS2.png" alt="Profile"/>
                                )
                            }
                            <div className='user-post-username'>{tweet.user.username}</div>
                        </div>
                        <div className='post-caption-edit'>
                            <textarea
                                placeholder='Write a caption...'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditTweetForm;