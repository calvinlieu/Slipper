import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import TweetOptions from './TweetOptions'

function TweetOptionsModal({ tweet }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <div className='post-options-button' onClick={() => setShowModal(true)}><i className='fa-solid fa-ellipsis fa-xl'></i></div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <TweetOptions tweet={tweet} onClick={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    )
}

export default TweetOptionsModal;