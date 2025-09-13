import React, { useState, useEffect } from "react";
import myimage from "../assets/image.jpg";

import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import SubtaskSection from "../components/SubtaskSection";
import FilterButtons from "../components/FilterButtons";
import FireworkDisplay from "../components/FireworkDisplay";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [subtaskText, setSubtaskText] = useState("");
  const [error, setError] = useState(false);
  const [subtask, setSubtask] = useState(false);
  const [selectedTaskName, setSelectedTaskName] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showFireworks, setShowFireworks] = useState(false);

  const checkAllSubtasksCompleted = () => {
    const allCompleted = tasks.every((task) => task.subtasks.every((sub) => sub.color === "#118B50"));
    if (allCompleted && tasks.length > 0) {
      setShowFireworks(true);
      setTimeout(() => setShowFireworks(false), 5000);
    }
  };


  useEffect(() => {
    const savedTasks = localStorage.getItem("myTasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.isComplete;
    if (filter === "completed") return task.isComplete;
    return true;
  });

  const selectedTask = tasks.find((task) => task.taskName === selectedTaskName);


  const handleClick = () => {
  if (taskText.trim() === "") {
    setError(true);
    setTimeout(() => setError(false), 3000);
    return;
  }
  setError(false);
  const now = new Date()
  const day =now.getDate()
  const month = now.getMonth()+1
  const hour = now.getHours()
  const Minutes = now.getMinutes()
  const updatedTasks = [...tasks, { taskName: taskText, subtasks: [], isComplete: false , createdAt:`${hour}:${Minutes} , ${month}/${day} ` }];
  setTasks(updatedTasks);
  setTaskText("");
  localStorage.setItem("myTasks", JSON.stringify(updatedTasks));
};
  const handleKeyPress = (e) => {
    if (e.key === "Enter") { 
      handleClick()
    }
  }

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
  updatedTasks[taskIndex].isComplete = updatedTasks[taskIndex].subtasks.every(sub => sub.color === '#118B50');

  setTasks(updatedTasks);
  setSubtaskText("");
  localStorage.setItem("myTasks", JSON.stringify(updatedTasks));
};

const cancelSubtask = (subtaskIndex) => {
  const updatedTasks = [...tasks];
  const taskIndex = updatedTasks.findIndex(task => task.taskName === selectedTaskName);

  updatedTasks[taskIndex].subtasks = updatedTasks[taskIndex].subtasks.filter((_, index) => index !== subtaskIndex);

  updatedTasks[taskIndex].isComplete =
    updatedTasks[taskIndex].subtasks.length > 0 &&
    updatedTasks[taskIndex].subtasks.every(sub => sub.color === '#118B50');

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

  updatedTasks[taskIndex].subtasks[subtaskIndex].color =
    currentColor === 'rgb(33, 37, 41)' ? '#118B50' : 'rgb(33, 37, 41)';

  updatedTasks[taskIndex].isComplete =
    updatedTasks[taskIndex].subtasks.length > 0 &&
    updatedTasks[taskIndex].subtasks.every(sub => sub.color === '#118B50');

  setTasks(updatedTasks);
  localStorage.setItem("myTasks", JSON.stringify(updatedTasks));
  checkAllSubtasksCompleted();
};



  return (
    <div className="mycontainer">
      <FireworkDisplay show={showFireworks} />
      <div className="row">
        <div className="col-lg-3 List bg-dark text-light p-1 RightSec"  >
          <TaskInput taskText={taskText} setTaskText={setTaskText} handleClick={handleClick} error={error} handleKeyPress={handleKeyPress} />
          <FilterButtons setFilter={setFilter} setSubtask={setSubtask} />
          <TaskList tasks={tasks} filteredTasks={filteredTasks} handleCancel={handleCancel} handleSubtask={handleSubtask} />
        </div>
        <div className="col-lg-9 rightsec">
          {!subtask && (
            <div className="container d-flex flex-column align-items-center justify-content-center p-3 mt-3">
              <img className="w-75" src={myimage} alt="task management" />
            </div>
          )}
          {subtask && <SubtaskSection task={selectedTask} subtaskText={subtaskText} setSubtaskText={setSubtaskText} handleAddSubtask={handleAddSubtask} cancelSubtask={cancelSubtask} changeColor={changeColor} />}
        </div>
      </div>
<footer dir="ltr" className="bg-dark text-light text-center py-2 mt-auto">
&copy; {new Date().getFullYear()} Mohamed Khaled. جميع الحقوق محفوظة.
</footer>    </div>
  );
}
