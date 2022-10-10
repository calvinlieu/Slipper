import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import DeleteComment from './DeleteComment'
import "../DeleteTweet/DeleteTweet.css"

function DeleteCommentModal({ commentId, tweet }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <div className='delete-tweet-button' onClick={() => setShowModal(true)}><i className="fa-regular fa-trash-can"></i></div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <DeleteComment comment={commentId} tweet={tweet} onClick={() => setShowModal(false)} />
            </Modal>
        )}
        </>
    )
}

export default DeleteCommentModal