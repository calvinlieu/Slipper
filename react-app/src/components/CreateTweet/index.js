import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateTweetForm from "./CreateTweetForm";

function CreateTweetModal({ tweet }) {
  // const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="edit-post-button" onClick={() => setShowModal(true)}>
        <div className="tweet-modal">Tweet</div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateTweetForm tweet={tweet} onClick={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default CreateTweetModal;