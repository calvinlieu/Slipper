import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import EditTweetForm from './EditTweetForm'
import './EditTweet.css'

function EditTweetModal({ tweet }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <div className='edit-post-button' onClick={() => setShowModal(true)}>Edit</div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <EditTweetForm tweet={tweet} onClick={() => setShowModal(false)} />
            </Modal>
        )}
        </>
    )
}

export default EditTweetModal
