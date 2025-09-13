import React from "react";
import TaskChart from "./TaskChart";

export default function TaskList({ filteredTasks, handleCancel, handleSubtask }) {

  return (
   <>
    <ol className="px-1 ms-3 me-5">
      {filteredTasks.map((task, index) => (
        <div
          className="d-flex align-items-center justify-content-between border-bottom mt-3"
          key={index}
        >
         <li
  onClick={() => handleSubtask(task.taskName)}
  className="p-3  text-wrap text-break flex-grow-1 "
  style={{ color: task.isComplete ? "#118B50" : "white", cursor: "pointer" }}
>
  {task.isComplete ? (
    <i className="fa-solid fa-check text-light bg-success p-1 ms-1 rounded-circle"></i>
  ) : (
    <i className="fa-solid fa-clock text-warning p-1 ms-1 "></i>
  )}
  {task.taskName}
</li>
      <div className="d-flex flex-column justify-content-center-content-center align-items-end gap-2 p-1 ">
        <button
            onClick={() => handleCancel(task.taskName)}
            className="btn btn-danger btn-sm rounded-4"
          >
            X
          </button>
        <p style={{fontSize:"14px" , color:"gray" , width:"80px"}} className="m-0">{task.createdAt}</p>
      </div>
          
        </div>
      ))}
    </ol>
    
   </>
  );
}
