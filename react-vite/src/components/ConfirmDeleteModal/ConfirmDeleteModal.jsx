import { useDispatch } from "react-redux";
import { thunkDeleteCoverLetter } from "../../redux/coverLetter";
import { useModal } from "../../context/Modal";
import "./ConfirmDeleteModal.css";


function ConfirmDeleteModal({ coverLetterId }) {
    console.log(coverLetterId)
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        await dispatch(thunkDeleteCoverLetter(coverLetterId))
        closeModal();
    }

    return (
        <div className="delete-confirmation-modal">
            <h2 className="modal-title">Delete Cover Letter</h2>
            <p className="'confirmation-message">
                Are you sure you want to delete this cover letter?
            </p>
            <div className='modal-actions'>
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

export default ConfirmDeleteModal
