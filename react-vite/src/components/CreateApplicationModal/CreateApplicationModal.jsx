import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateApplication } from "../../redux/application";
import { thunkFetchCompanies } from "../../redux/company";
import { useModal } from "../../context/Modal";
import './CreateApplicationModal.css'

function CreateApplicationModal({ status }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const companies = useSelector((state) => state.companies);

  const [title, setTitle] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [statusValue, setStatusValue] = useState(status || 1);
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(thunkFetchCompanies());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!companyId) {
      validationErrors.companyId = "You must select a company.";
    }

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const applicationData = {
      title,
      company_id: parseInt(companyId, 10),
      status: statusValue,
      description,
      website_url: websiteUrl,
    };

    await dispatch(thunkCreateApplication(applicationData));
    closeModal();
  };

  return (
    <div className="create-application-modal">
      <h2 className="modal-title">Create Application</h2>
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
          {errors.companyId && <p className="error-message">{errors.companyId}</p>}
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
          <button className="btn btn-primary" type="submit">Create</button>
          <button className="btn btn-secondary" type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateApplicationModal;
