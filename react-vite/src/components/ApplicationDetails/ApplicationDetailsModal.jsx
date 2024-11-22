import React from "react";
import { useModal } from "../../context/Modal";
import "./ApplicationDetailsModal.css";

function ApplicationDetailsModal({ application }) {
  const { closeModal } = useModal();
  const { title, status, description, website_url: websiteUrl, company } = application;

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
      <button className="btn btn-close" onClick={closeModal}>
        Close
      </button>
    </div>
  );
}

export default ApplicationDetailsModal;
