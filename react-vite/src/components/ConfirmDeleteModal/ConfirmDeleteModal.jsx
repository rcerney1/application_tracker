import { useModal } from "../../context/Modal";
import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ onDelete, message = "Are you sure you want to delete this?" }) {
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await onDelete(); // Call the passed delete function
    closeModal();
  };

  return (
    <div className="delete-confirmation-modal">
      <h2 className="modal-title">Confirm Delete</h2>
      <p className="confirmation-message">{message}</p>
      <div className="modal-actions">
        <button className="confirm-button" onClick={handleDelete}>
          Confirm
        </button>
        <button className="cancel-button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
