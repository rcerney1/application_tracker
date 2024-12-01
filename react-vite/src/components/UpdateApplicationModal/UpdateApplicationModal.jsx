import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkUpdateApplication } from "../../redux/application";
import { thunkFetchCompanies } from "../../redux/company";
import { useModal } from "../../context/Modal";
import './UpdateApplicationModal.css'

function UpdateApplicationModal({ application }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const companies = useSelector((state) => state.companies);

  const [title, setTitle] = useState(application.title);
  const [companyId, setCompanyId] = useState(application.company.id || "");
  const [statusValue, setStatusValue] = useState(application.status);
  const [description, setDescription] = useState(application.description || "");
  const [websiteUrl, setWebsiteUrl] = useState(application.website_url || "");

  useEffect(() => {
    dispatch(thunkFetchCompanies());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...application,
      title,
      company_id: parseInt(companyId, 10), // Ensure proper ID format
      status: statusValue,
      description,
      website_url: websiteUrl,
    };

    await dispatch(thunkUpdateApplication(application.id, updatedData));
    closeModal();
  };

  return (
    <div className="update-application-modal">
      <h2 className="modal-title">Update Application</h2>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Company</label>
          <select
            id="company"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            required
          >
            <option value="">Select a company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
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
          <label>Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional"
          />
        </div>
        <div className="form-group">
          <label>Website URL</label>
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
