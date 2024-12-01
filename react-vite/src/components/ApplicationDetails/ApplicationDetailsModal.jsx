import { useModal } from "../../context/Modal";
import "./ApplicationDetailsModal.css";

function ApplicationDetailsModal({ application }) {
  const { closeModal } = useModal();
  const { title, status, description, website_url: websiteUrl, company, cover_letters } = application;

  
  const statusLabels = {
    1: "Applied",
    2: "Interview",
    3: "Offers",
    4: "Rejected",
  };

  return (
    <div className="application-details-modal">
      <h2 className="modal-title">{title}</h2>
      <div className="details">
        <p><strong>Company:</strong> {company?.name || "No Company"}</p>
        <p><strong>Status:</strong> {statusLabels[status]}</p>
        {description && <p><strong>Description:</strong> {description}</p>}
        {websiteUrl && (
          <p>
            <strong>Website:</strong> <a href={websiteUrl} target="_blank" rel="noopener noreferrer">{websiteUrl}</a>
          </p>
        )}
      </div>
      

      {cover_letters && cover_letters.length > 0 && (
        <>
        <h3>Cover Letters:</h3>
        <ul className="cover-letters">
            {cover_letters.map((coverLetter) => (
              <li key={coverLetter.id}>
                <a
                  href={coverLetter.image?.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {coverLetter.title}
                </a>
              </li>
            ))}
          </ul>
        </>
    
       
      )}
      

      <button className="close-button" onClick={closeModal}>
        Close
      </button>
    </div>
  );
}

export default ApplicationDetailsModal;
