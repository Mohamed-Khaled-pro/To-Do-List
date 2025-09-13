import React from "react";
import TaskChart from "./TaskChart";

export default function SubtaskSection({ task, subtaskText, setSubtaskText, handleAddSubtask, cancelSubtask, changeColor }) {
  if (!task) return null;

  return (
    <div className="mt-4 w-10" dir="rtl">
<div className="nameoftask-container" dir="rtl">
  <h1 className="nameoftask">{task.taskName}</h1>
</div>      <div className="input-group mb-3 w-100 p-3">
  <input
    type="text"
    dir="rtl"
    placeholder="أضافة المهام"
    value={subtaskText}
    onChange={(e) => setSubtaskText(e.target.value)}
    className="form-control fs-5"
    style={{
      outline: "none",
      boxShadow: "none",
      borderTopRightRadius: "0.375rem",   
      borderBottomRightRadius: "0.375rem"
    }}
    onKeyDown={(e) => {
      if (e.key === "Enter") handleAddSubtask(); 
    }}
  />
  <button
    className="btn btn-success fs-5"
    onClick={handleAddSubtask}
    style={{
      borderTopLeftRadius: "0",     
      borderBottomLeftRadius: "0",
    }}
  >
    إضافة
  </button>
</div>

      <ul className="w-100 ms-3 d-flex flex-column align-items-end gap-4 px-3 " dir="rtl">
        {task.subtasks.map((sub, idx) => (
          <div
            key={idx}
            style={{ backgroundColor: sub.color }}
            className="w-100 d-flex align-items-center justify-content-between  border mt-2 fs-5 rounded-2 border-dark py-2"
          >
            <li className="listsub p-2 mx-2 text-break text-wrap text-light w-100" style={{listStyle:'none'}}>{sub.text}</li>
            <div className="d-flex ">
              <button onClick={() => cancelSubtask(idx)} className="btn btn-danger btn-sm m-2">
                X
              </button>
              <button onClick={() => changeColor(idx)} className="btn btn-success btn-sm m-2 text-nowrap">
                {sub.color === "#118B50" ? "أكتمل" : "لم يكتمل"}
              </button>
            </div>
          </div>
        ))}
      </ul>
      <div>
      <TaskChart selectedTask={task} />
      </div>
    </div>
  );
}
