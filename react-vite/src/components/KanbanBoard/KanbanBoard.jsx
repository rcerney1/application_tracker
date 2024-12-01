import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "@hello-pangea/dnd";
import KanbanColumn from "./KanbanColumn";
import { thunkFetchApplications, thunkUpdateApplication } from "../../redux/application";
import "./KanbanBoard.css";

function KanbanBoard() {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.applications.applications);
  const [groupedApplications, setGroupedApplications] = useState({});

  const columns = [
    { title: "Applied", status: 1 },
    { title: "Interviews Scheduled", status: 2 },
    { title: "Offers", status: 3 },
    { title: "Rejected", status: 4 },
  ];

  useEffect(() => {
    const grouped = columns.reduce((acc, column) => {
      acc[column.status] = applications.filter((app) => app.status === column.status);
      return acc;
    }, {});
    setGroupedApplications(grouped);
  }, [applications, columns]); 

  useEffect(() => {
    dispatch(thunkFetchApplications());
  }, [dispatch]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return; 

    const sourceStatus = parseInt(source.droppableId, 10);
    const destinationStatus = parseInt(destination.droppableId, 10);

    if (sourceStatus === destinationStatus) {
      const reordered = Array.from(groupedApplications[sourceStatus]);
      const [movedItem] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, movedItem);

      setGroupedApplications((prev) => ({
        ...prev,
        [sourceStatus]: reordered,
      }));
    } else {
      const sourceApps = Array.from(groupedApplications[sourceStatus]);
      const destinationApps = Array.from(groupedApplications[destinationStatus]);

      const [movedItem] = sourceApps.splice(source.index, 1);
      movedItem.status = destinationStatus;

      destinationApps.splice(destination.index, 0, movedItem);

      setGroupedApplications((prev) => ({
        ...prev,
        [sourceStatus]: sourceApps,
        [destinationStatus]: destinationApps,
      }));

     
      dispatch(thunkUpdateApplication(draggableId, { ...movedItem, status: destinationStatus }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board-container">
        <h1 className="kanban-board-title">Job Tracker</h1>
        <div className="kanban-board">
          {columns.map((column) => (
            <KanbanColumn
              key={column.status}
              title={column.title}
              status={column.status}
              applications={groupedApplications[column.status] || []}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;
