import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateCoverLetter } from '../../redux/coverLetter';
import { thunkFetchApplications } from '../../redux/application';
import { thunkAddCoverLetterImage } from '../../redux/coverLetterImage';
import { useModal } from '../../context/Modal';
import "./CreateCoverLetterModal.css";

function CreateCoverLetterModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const applications = useSelector((state) => state.applications.applications);

    const [title, setTitle] = useState("");
    const [applicationId, setApplicationId] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(thunkFetchApplications());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const validationErrors = {}; 
    
        if (!title) {
            validationErrors.title = "Title is required.";
        }
    
        if (!fileUrl) {
            validationErrors.fileUrl = "File URL is required.";
        }
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    
        const coverLetterData = {
            title,
            application_id: applicationId ? parseInt(applicationId, 10) : null,
        };
    
        try {
            const newCoverLetter = await dispatch(thunkCreateCoverLetter(coverLetterData));
    
            
            if (newCoverLetter && newCoverLetter.id) {
                const imagePayload = { file_url: fileUrl };
                await dispatch(thunkAddCoverLetterImage(newCoverLetter.id, imagePayload));
            }
    
            closeModal();
            window.location.reload();
        } catch (error) {
            console.error("Failed to create cover letter or add image:", error);
        }
    };

    return (
        <div className="create-cover-letter-modal">
            <h2 className="modal-title">Create Cover Letter</h2>
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
                        Create
                    </button>
                    <button className="btn btn-secondary" type="button" onClick={closeModal}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateCoverLetterModal;
