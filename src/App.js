import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [todo, setToDo] = useState([
    
  ]);

  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  const addTask = (id) => {
    if (newTask) {
      let num = todo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...todo, newEntry]);
      setNewTask("");
    }
  };
  const deleteTask = (id) => {
    let newTasks = todo.filter(task => task.id !== id);
    setToDo(newTasks);
  };
  const markDone = (id) => {
    let newTask = todo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTask);
  };
  const cancelUpdate = () => {
    setUpdateData("");
  };
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };
  const updateTask = () => {
    let filterRecords = [...todo].filter((task) => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject);
    setUpdateData('');
  };
  return (
    <div className="container App">
      <br />
      <br />
      <h2>To Do List App(ReactJS)</h2>
      <br />
      <br />

      {/* Update Task */}
      {updateData && updateData ? (
        <>
        <div className="row">
        <div className="col">
          <input 
          value={updateData && updateData.title}
          onChange={(e) => changeTask(e)}
          className="form-control form-control-lg" />
        </div>
        <div className="col-auto">
          <button onClick={updateTask} className="btn btn-lg btn-success mr-20">
            Update
          </button>
          <button
          onClick={cancelUpdate} 
          className="btn btn-lg btn-warning"
          >Cancel</button>
        </div>
      </div>
      <br />
        </>

      ) : (
        <>
        <div className="row">
        <div className="col">
          <input 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="form-control form-control-lg"
          />
        </div>
        <div className="col-auto">
          <button onClick={addTask} className="btn btn-lg btn-success">
            Add Task
          </button>
        </div>
      </div>
      <br />
        </>

      )}
      
      

      {todo && todo.length ? "" : "No Tasks..."}
      {todo &&
        todo
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((task, index) => {
            return (
              <React.Fragment key={task.id}>
                <div className="col taskBg">
                  <div className={task.status ? "done" : ""}>
                    <span className="taskNumber">{index + 1}</span>
                    <span className="taskText">{task.title}</span>
                  </div>
                  <div className="iconsWrap">
                    <span
                      title="Completed/Not Completed"
                      onClick={(e) => markDone(task.id)}
                    >
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </span>

                    {task.status ? null : (
                      <span
                        title="Edit"
                        onClick={() =>
                          setUpdateData({
                            id: task.id,
                            title: task.title,
                            status: task.status ? true : false,
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    )}

                    <span title="Delete" onClick={() => deleteTask(task.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
    </div>
  );
}

export default App;
