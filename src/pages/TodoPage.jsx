import React from 'react'
import {useState,useEffect} from 'react'
import '../styles/TodoPage.css';

import BackFeature from '../components/BackFeature'

const TodoPage = () => {
    const[task,setTask]=useState('')
   const[titleTask,settitleTask]=useState('')
   const[important,setImportant]=useState(false)
  const[tasks,setTasks]=useState(() => {
  const savedTasks = localStorage.getItem("tasks");

  return savedTasks
    ? JSON.parse(savedTasks)
    : [];
});


useEffect(()=>{
   localStorage.setItem("tasks",JSON.stringify(tasks))
  },[tasks])
   
  
  function addTask(){
   
    if(task.trim() === "") 
    return;
    setTasks([...tasks, {
      title:titleTask,
      text:task,
      completed:false,
      important:important
    }])

    setTask("")
    settitleTask("")


  }
 
  function deleteTask(clickedIndex){
    const newTasks=tasks.filter((item,index)=>{
      return index!== clickedIndex
      
    })
setTasks(newTasks)
    
  }

  function toggle(clickedindex){
   let updatedTask= tasks.map((item,index)=>{
      if(index===clickedindex){
        return {...item,
          completed:!item.completed}
      }
      return item;
    })
    setTasks(updatedTask)
  }



 return (
  <div className="todoPage">

  

    <div className="todoHeader">

      <h1 className="pageTitle">
        Personalized Task List
      </h1>

      <BackFeature />

    </div>

  

    <div className="todoContent">

     

      <div className="formSection">

        <input
          type="text"
          placeholder="Enter Task Heading"
          value={titleTask}
          onChange={(e) =>
            settitleTask(e.target.value)
          }
        />

        <textarea
          placeholder="Enter Details"
          value={task}
          onChange={(e) =>
            setTask(e.target.value)
          }
        />

        <div className="importantRow">

          <input
            type="checkbox"
            checked={important}
            onChange={(e) =>
              setImportant(e.target.checked)
            }
          />

          <label>
            Mark as Important!!!
          </label>

        </div>

        <button
          className="addBtn"
          onClick={addTask}
        >
          Add Task
        </button>

      </div>

    

      <div className="taskContainer">

        {
          tasks.length === 0 ? (

            <p className="emptyTask">
              No Tasks Yet 
            </p>

          ) : (

            tasks.map((item, index) => (

              <div
                className="taskCard"
                key={index}
              >

                <div className="taskHeader">

                  <h2
                    className={
                      item.completed
                        ? "completedTitle"
                        : ""
                    }
                  >
                    {item.title}
                  </h2>

                  {
                    item.important && (

                      <span
                        className="importantBadge"
                      >
                        IMP
                      </span>

                    )
                  }

                </div>

                <p
                  className={
                    item.completed
                      ? "completedText"
                      : ""
                  }
                >
                  {item.text}
                </p>

                <div className="actions">

                  <button
                    onClick={() =>
                      toggle(index)
                    }
                  >
                    {
                      item.completed
                        ? "Completed"
                        : "Mark as Completed"
                    }
                  </button>

                  <button
                    onClick={() =>
                      deleteTask(index)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )
        }

      </div>

    </div>

  </div>
);
}

export default TodoPage
