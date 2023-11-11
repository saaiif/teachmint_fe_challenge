import "./Style.css";

function PostDetailModal({ isOpen, onClose, children }) {
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleOverlayClick = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="postdetailmodal_overlay" onClick={handleOverlayClick}>
          <div className="postdetailmodal" onClick={handleModalClick}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default PostDetailModal;
