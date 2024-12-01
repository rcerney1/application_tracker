import OpenModalButton from "../OpenModalButton";
import UpdateCoverLetterModal from "../UpdateCoverLetterModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import "./MyCoverLetters.css"

function CoverLetterCard({coverLetter}) {
    const { id, title, image, application_title } = coverLetter;
    

    const handleImageClick = () => {
        if (image && image.file_url) {
            window.open(image.file_url, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div className="cover-letter-card">
            <div className="cover-letter-image-container" onClick={handleImageClick}>
                {image && image.file_url ? (
                    <img src={image.file_url} alt={`Cover Letter for ${title}`} className="cover-letter-image" />
                ) : (
                    <div className='placeholder-image'>No Image</div>
                )}
            </div>
            <div className="cover-letter-details">
                <h3 className='cover-letter-title'>{title}</h3>
                {application_title && (
                    <p className='job'>For: {application_title}</p>
                )}
                <div className="card-actions">
                    <OpenModalButton
                            modalComponent={<UpdateCoverLetterModal coverLetterId={id}/>}
                            buttonText="Edit"
                            className='edit-button'
                    />

                    <OpenModalButton 
                        modalComponent={
                            <ConfirmDeleteModal coverLetterId={id}/>
                        }
                        buttonText="Delete"
                        className="delete-button"
                    />
                </div>
            </div>
        </div>
    );
}

export default CoverLetterCard;