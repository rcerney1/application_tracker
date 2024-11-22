import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkUpdateApplication } from "../../redux/application";
import { useModal } from "../../context/Modal";
import './UpdateApplicationModal.css'

function UpdateApplicationModal({ application }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [title, setTitle] = useState(application.title);
  const [companyName, setCompanyName] = useState(application.company.name);
  const [statusValue, setStatusValue] = useState(application.status);
  const [description, setDescription] = useState(application.description || "");
  const [websiteUrl, setWebsiteUrl] = useState(application.website_url || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...application,
      title,
      companyName,
      status: statusValue,
      description,
      websiteUrl,
    };
    await dispatch(thunkUpdateApplication(application.id, updatedData));
    closeModal();
  };

  return (
    <div className="update-application-modal">
      <h2 className="modal-title">Update Application</h2>
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
        </div>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={statusValue}
            onChange={(e) => setStatusValue(parseInt(e.target.value, 10))}
          >
            <option value={1}>Applied</option>
            <option value={2}>Interview</option>
            <option value={3}>Offers</option>
            <option value={4}>Rejected</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional"
          />
        </div>
        <div className="form-group">
          <label htmlFor="websiteUrl">Website URL</label>
          <input
            id="websiteUrl"
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="Optional"
          />
        </div>
        <div className="modal-actions">
          <button className="btn btn-primary" type="submit">Update</button>
          <button className="btn btn-secondary" type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateApplicationModal;
