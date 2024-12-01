import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkFetchCoverLetterByID } from "../../redux/coverLetter";
import "./CoverLetterDetailPage.css";

function CoverLetterDetailPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const coverLetter = useSelector((state) => state.coverLetters.coverLetter);

    useEffect(() => {
        dispatch(thunkFetchCoverLetterByID(id));
    }, [dispatch, id]);

    if (!coverLetter) {
        return <div>Loading...</div>;
    }

    const { title, application_title, image, created_at, updated_at } = coverLetter;

    return (
        <div className="cover-letter-detail-container">
            <h1>{title}</h1>
                {image ? (
                    <div className="image-container">
                        <img
                            src={image.file_url}
                            alt={`Cover Letter for ${title}`}
                            className="cover-letter-image"
                            onClick={() => window.open(image.file_url, "_blank", "noopener,noreferrer")}
                        />
                    </div>
                ) : (
                    <p>No image available</p>
                )}
            <div className="metadata">
                <p><strong>Application:</strong> {application_title || "Not linked to an application"}</p>
                <p><strong>Created At:</strong> {new Date(created_at).toLocaleString()}</p>
                <p><strong>Last Updated:</strong> {new Date(updated_at).toLocaleString()}</p>
            </div>
        </div>
    );
}

export default CoverLetterDetailPage;
