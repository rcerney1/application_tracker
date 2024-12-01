import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkUpdateCoverLetter, thunkFetchCoverLetterByID } from "../../redux/coverLetter";
import { thunkUpdateCoverLetterImage } from "../../redux/coverLetterImage";
import { thunkFetchApplications } from "../../redux/application";
import { useModal } from "../../context/Modal";
import "./UpdateCoverLetterModal.css";

function UpdateCoverLetterModal({ coverLetterId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const coverLetter = useSelector((state) =>
        state.coverLetters.coverLetters.find((c) => c.id === coverLetterId)
    );
    const applications = useSelector((state) => state.applications.applications);

    const [title, setTitle] = useState(coverLetter?.title || "");
    const [applicationId, setApplicationId] = useState(coverLetter?.application_id || "");
    const [fileUrl, setFileUrl] = useState(coverLetter?.image?.file_url || "");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!coverLetter) {
            dispatch(thunkFetchCoverLetterByID(coverLetterId));
        }
        dispatch(thunkFetchApplications());
    }, [dispatch, coverLetter, coverLetterId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};

        if (!title) validationErrors.title = "Title is required.";
        if (!fileUrl) validationErrors.fileUrl = "Image URL is required.";

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        const updatedData = {
            title,
            application_id: applicationId || null,
        };

        try {
            await dispatch(thunkUpdateCoverLetter(coverLetterId, updatedData));

            if (fileUrl) {
                const imagePayload = { file_url: fileUrl };
                await dispatch(thunkUpdateCoverLetterImage(coverLetterId, imagePayload));
            }

            closeModal();
            window.location.reload();
        } catch (error) {
            console.error("Failed to update cover letter or image:", error);
        }
    };

    if (!coverLetter) return <div>Loading...</div>;

    return (
        <div className="update-cover-letter-modal">
            <h2 className="modal-title">Update Cover Letter</h2>
            <form className="modal-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    {errors.title && <p className="error-message">{errors.title}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="application">Link to Application (Optional)</label>
                    <select
                        id="application"
                        value={applicationId}
                        onChange={(e) => setApplicationId(e.target.value)}
                    >
                        <option value="">Select an application</option>
                        {applications.map((application) => (
                            <option key={application.id} value={application.id}>
                                {application.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="fileUrl">Image URL</label>
                    <input
                        id="fileUrl"
                        type="url"
                        value={fileUrl}
                        onChange={(e) => setFileUrl(e.target.value)}
                        required
                    />
                    {errors.fileUrl && <p className="error-message">{errors.fileUrl}</p>}
                </div>

                <div className="modal-actions">
                    <button className="btn btn-primary" type="submit">
                        Update
                    </button>
                    <button className="btn btn-secondary" type="button" onClick={closeModal}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateCoverLetterModal;
