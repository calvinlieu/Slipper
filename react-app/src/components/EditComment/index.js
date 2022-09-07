import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditCommentForm from "./EditCommentForm";


function EditCommentModal({ tweet, commentId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="edit-post-button" onClick={() => setShowModal(true)}><i className="fa-regular fa-pen-to-square"></i></div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCommentForm tweet={tweet} commentId={commentId} onClick={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;