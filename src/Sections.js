

import React, { useState, useEffect } from 'react';
import myimage from './image.jpg';
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

export default function SectionLF() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [subtaskText, setSubtaskText] = useState("");
  const [error, setError] = useState(false);
  const [subtask, setSubtask] = useState(false);
  const [selectedTaskName, setSelectedTaskName] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showFireworks, setShowFireworks] = useState(false);

  const checkAllSubtasksCompleted = () => {
    const allCompleted = tasks.every(task =>
      task.subtasks.every(subtask => subtask.color === '#118B50')
    );

    if (allCompleted) {
      setShowFireworks(true);
      setTimeout(() => {
        setShowFireworks(false);
      }, 5000); 
    }
  };

  const handleClick = () => {
    if (taskText.trim() === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000); 
      return;
    }
    setError(false);
    const updatedTasks = [...tasks, { taskName: taskText, subtasks: [], isComplete: false }];
    setTasks(updatedTasks);
    setTaskText("");
    localStorage.setItem("myTasks", JSON.stringify(updatedTasks));
  };

  const handleCancel = (taskNameToDelete) => {
    const updatedTasks = tasks.filter(task => task.taskName !== taskNameToDelete);
    setTasks(updatedTasks);
    localStorage.setItem("myTasks", JSON.stringify(updatedTasks));
    setSubtask(false);
  };

  const handleSubtask = (taskName) => {
    setSelectedTaskName(taskName);
    setSubtask(true);
  };

  const handleAddSubtask = () => {
    if (subtaskText.trim() === "") return setError(true);
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex(task => task.taskName === selectedTaskName);
    updatedTasks[taskIndex].subtasks.push({ text: subtaskText, color: 'rgb(33, 37, 41)' });
    updatedTasks[taskIndex].isComplete = updatedTasks[taskIndex].subtasks.every((sub) => sub.color === '#118B50');
    setTasks(updatedTasks);
    setSubtaskText("");
    localStorage.setItem("myTasks", JSON.stringify(updatedTasks));
  };

  const cancelSubtask = (subtaskIndex) => {
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex(task => task.taskName === selectedTaskName);
    updatedTasks[taskIndex].subtasks = updatedTasks[taskIndex].subtasks.filter((_, index) => index !== subtaskIndex);

    updatedTasks[taskIndex].isComplete = updatedTasks[taskIndex].subtasks.length > 0 && updatedTasks[taskIndex].subtasks.every((sub) => sub.color === '#118B50');
    
    if (updatedTasks[taskIndex].subtasks.length === 0) {
      updatedTasks[taskIndex].isComplete = false;
    }

    setTasks(updatedTasks);
    localStorage.setItem("myTasks", JSON.stringify(updatedTasks));
  };

  const changeColor = (subtaskIndex) => {
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex(task => task.taskName === selectedTaskName);
    const currentColor = updatedTasks[taskIndex].subtasks[subtaskIndex].color;

    updatedTasks[taskIndex].subtasks[subtaskIndex].color = currentColor === 'rgb(33, 37, 41)' ? '#118B50' : 'rgb(33, 37, 41)';

    updatedTasks[taskIndex].isComplete = updatedTasks[taskIndex].subtasks.length > 0 && updatedTasks[taskIndex].subtasks.every(sub => sub.color === '#118B50');
    
    setTasks(updatedTasks);
    localStorage.setItem("myTasks", JSON.stringify(updatedTasks));
    checkAllSubtasksCompleted()
  };

  useEffect(() => {
    const savedTasks = localStorage.getItem("myTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.isComplete;
    if (filter === 'completed') return task.isComplete;
    return true;
  });

  return (
    <div className="mycontainer">
      {showFireworks && (
        <Fireworks
          autorun={{ speed: .8 }}
        />
      )}

      <div className="row">
        <div className="col-lg-3 List bg-dark text-light">
          <div className="d-flex flex-column align-items-center justify-content-center p-3">
            <input
              type="text"
              placeholder="عنوان المهمة الرئيسية"
              className="form-control mb-2"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
            <button onClick={handleClick} className="btn btn-success w-100">إضافة</button>
            {error && <div className="alert alert-danger mt-2">يجب عليك كتابة اسم المهمة</div>}
            <div className="d-flex flex-row align-items-center justify-content-center p-3">
              <button className="btn btn-primary m-2 btn-sm" onClick={() => {
                setFilter("all")
                setSubtask(false)
              }
              } >الكل</button>
              <button className="btn btn-warning text-light m-2 btn-sm" onClick={() => {setFilter("pending")
                          setSubtask(false)
                        }
            }>قيد الأنتظار</button>
              <button className="btn btn-success m-2 btn-sm" onClick={() => {setFilter("completed")
                setSubtask(false)
              }}>أكتملت</button>
            </div>
          </div>

          <ol className="p-2 ms-3 ">
            {filteredTasks.map((task, index) => (
              <div className="d-flex align-items-center justify-content-between border-bottom mt-3" key={index}>
                <li onClick={() => handleSubtask(task.taskName)} style={{ color: task.isComplete ? '#118B50' : 'white' }} className="p-2 ms-2 ole">
                  {task.isComplete ? (
                    <i className="fa-solid fa-check text-light bg-success p-1 me-1"></i>
                  ) : (
                    <i className="fa-solid fa-clock text-warning me-1"></i>
                  )}
                  {task.taskName}
                </li>
                <button onClick={() => handleCancel(task.taskName)} className="btn btn-danger btn-sm">X</button>
              </div>
            ))}
          </ol>
        </div>

        <div className="col-lg-9 rightsec">
          {!subtask && (
            <div className="container d-flex flex-column align-items-center justify-content-center p-3 mt-3">
              <img className="w-50" src={myimage} alt="task management" />
            </div>
          )}
          {subtask && selectedTaskName !== null && (
            <div className="mt-4">
              <h1 className="mb-4 text-center nameoftask">{tasks.find(task => task.taskName === selectedTaskName).taskName}</h1>
              <div className="input-group mb-3 w-100 p-3">
                <button className="btn btn-success" onClick={handleAddSubtask}>إضافة</button>
                <input
                  type="text"
                  dir="rtl"
                  placeholder="أضافة المهام"
                  className="form-control fs-5"
                  value={subtaskText}
                  onChange={(e) => setSubtaskText(e.target.value)}
                />
              </div>
              <ul className="p-3 ms-3 d-flex flex-column align-items-end">
                {tasks.find(task => task.taskName === selectedTaskName).subtasks.map((subtask, idx) => (
                  <div key={idx} style={{ backgroundColor: subtask.color }} className="w-100 d-flex align-items-center justify-content-between border m-3 fs-4 rounded-4 p-1 border-dark">
                    <div>
                      <button onClick={() => cancelSubtask(idx)} className="btn btn-danger btn-sm m-2">X</button>
                      <button onClick={() => changeColor(idx)} className="btn btn-success btn-sm m-2">
                        {subtask.color === '#118B50' ? 'أكتمل' : 'لم يكتمل'}
                      </button>
                    </div>
                    <li className="listsub p-2 text-light w-75">{subtask.text}</li>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
             
