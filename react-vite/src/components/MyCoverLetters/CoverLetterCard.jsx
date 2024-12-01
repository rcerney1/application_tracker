import { useNavigate } from "react-router-dom";

function CoverLetterCard({ coverLetter }) {
  const navigate = useNavigate();
  const { id, title, image, application_title } = coverLetter;

  const handleCardClick = () => {
    navigate(`/coverletters/${id}`); // Navigate to the detail page
  };

  return (
    <div className="cover-letter-card" onClick={handleCardClick}>
      <div className="cover-letter-image-container">
        {image && image.file_url ? (
          <img src={image.file_url} alt={`Cover Letter for ${title}`} className="cover-letter-image" />
        ) : (
          <div className="placeholder-image">No Image</div>
        )}
      </div>
      <div className="cover-letter-details">
        <h3 className="cover-letter-title">{title}</h3>
        {application_title && <p className="job">For: {application_title}</p>}
      </div>
    </div>
  );
}

export default CoverLetterCard;
