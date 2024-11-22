import { Draggable } from "@hello-pangea/dnd";
import OpenModalButton from "../../components/OpenModalButton";
import ApplicationDetailsModal from "../ApplicationDetails";
import UpdateApplicationModal from "../UpdateApplicationModal";
import { useDispatch } from "react-redux";
import { thunkDeleteApplication } from "../../redux/application";
import "./KanbanBoard.css";

function ApplicationCard({ application, index }) {
  const { id, title, company } = application;
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      dispatch(thunkDeleteApplication(id));
    }
  };

  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided) => (
        <div
          className="application-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h3 className="application-title">
            <OpenModalButton
              modalComponent={<ApplicationDetailsModal application={application} />}
              buttonText={title}
            />
          </h3>
          
          <p className="application-company">{company?.name || "No Company"}</p>
          <div className="card-actions">
            <OpenModalButton
              modalComponent={<UpdateApplicationModal application={application} />}
              buttonText="Update"
            />
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default ApplicationCard;