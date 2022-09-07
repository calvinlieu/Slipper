import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CommentForm from "./CreateCommentForm";


function CreateCommentModal({ tweet }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="edit-post-button" onClick={() => setShowModal(true)}><i class="fa-regular fa-comment"></i></div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CommentForm tweet={tweet} onClick={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default CreateCommentModal;
