import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import ApplicationCard from "./ApplicationCard";
import OpenModalButton from "../../components/OpenModalButton";
import CreateApplicationModal from "../CreateApplicationModal";
import "./KanbanBoard.css";

function KanbanColumn({ title, applications, status }) {
  return (
    <div className="kanban-column">
      <div className="column-header">
        <h2 className="column-title">{title}</h2>
        <OpenModalButton
          modalComponent={<CreateApplicationModal status={status} />}
          buttonText="+ Create New"
        />
      </div>
      <Droppable droppableId={`${status}`}>
        {(provided) => (
          <div
            className="column-content"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {applications.map((application, index) => (
              <ApplicationCard
                key={application.id}
                application={application}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default KanbanColumn;
