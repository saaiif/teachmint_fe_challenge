import React, { useState } from "react";
import Label from "../../Utils/Label";
import PostDetailModal from "./PostDetailModal";

function PostCard({ post }) {
  const { userId, title, body: content } = post || {};
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="postCard__details" onClick={openModal}>
        <h4>
          <Label label={"Title"} /> {title}
        </h4>
        <h4>
          <Label label={"Content"} /> {content}
        </h4>
      </div>

      {isModalOpen && (
        <PostDetailModal isOpen={isModalOpen} onClose={closeModal}>
          <h3>
            <Label label={"Id"} />
            {userId}
          </h3>
          <h4>
            <Label label={"Title"} /> {title}
          </h4>
          <h4>
            <Label label={"Content"} /> {content}
          </h4>
        </PostDetailModal>
      )}
    </>
  );
}

export default PostCard;
