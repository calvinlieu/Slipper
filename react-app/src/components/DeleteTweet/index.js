import React, { useState } from 'react'
import { Modal } from '../../../context/Modal'
import DeleteTweet from './DeleteTweet'
import './DeleteTweet.css'

function DeleteTweetModal({ tweet }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <div className='delete-tweet-button top-option' onClick={() => setShowModal(true)}>Delete</div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <DeleteTweet tweet={tweet} onClick={() => setShowModal(false)} />
            </Modal>
        )}
        </>
    )
}

export default DeleteTweetModal