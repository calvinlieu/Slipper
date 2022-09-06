import React, { useState } from "react";
import { Modal } from "../../context/Modal";


function CreateCommentModal({ tweet }) {
  // const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="edit-post-button" onClick={() => setShowModal(true)}>
        {" "}
        <i className="fa-light fa-comment"></i>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateCommentForm tweet={tweet} onClick={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default CreateCommentModal;
