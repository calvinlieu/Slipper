import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import DeleteComment from './DeleteComment'
import './DeleteTweet.css'

function DeleteCommentModal({ comment }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <div className='delete-tweet-button top-option' onClick={() => setShowModal(true)}>Delete</div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <DeleteComment comment={comment} onClick={() => setShowModal(false)} />
            </Modal>
        )}
        </>
    )
}

export default DeleteCommentModal