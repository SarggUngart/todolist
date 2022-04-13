import React, {useState} from 'react';
import './App.css';
import {TasksType, ToDoList} from "./Components/ToDoList";
import {v1} from "uuid";


export type FilteredValueType = 'All' | 'Active' | 'Completed'

function App() {

  const [tasks, setTasks] = useState<TasksType[]>([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React", isDone: false},
    {id: v1(), title: "Redux", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false}
  ])

  const [filter, setFilter] = useState('All')

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  let tasksForTodoList = tasks
  switch (filter) {
    case 'Completed' :
      tasksForTodoList = tasksForTodoList.filter(el => el.isDone)
      break;
    case 'Active' :
      tasksForTodoList = tasksForTodoList.filter(el => !el.isDone)
      break;
    default:
  }

  const filteredTasks = (value: FilteredValueType) => {
    setFilter(value)
  }

  const addTask = (title: string) => {
    let newTask = {id: v1(), title, isDone: false}
    setTasks([newTask, ...tasks])
  }

  const changeStatus = (taskId: string, isDone: boolean) => {
    setTasks(tasks.map(el => el.id === taskId ? {...el, isDone} : el))
  }

  return (
    <div className="App">
      <ToDoList
        tasks={tasksForTodoList}
        title={'What to learn'}
        removeTask={removeTask}
        filteredTasks={filteredTasks}
        addTask={addTask}
        changeStatus={changeStatus}
      />
    </div>
  );
}

export default App;
