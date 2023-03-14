import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterType = 'All' | 'Active' | 'Completed'

function App(): JSX.Element {

  let [tasks, setTasks] = React.useState<TaskType[]>([
    {id: v1(), title: 'HTML', isDone: true},
    {id: v1(), title: 'CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: false},
  ])

  const [filter, setFilter] = React.useState<FilterType>('All')

  let filteredTasks = tasks

  switch (filter) {
    case "Active":
      filteredTasks = filteredTasks.filter(t => !t.isDone);
      break;
    case "Completed":
      filteredTasks = filteredTasks.filter(t => t.isDone);
      break;
    default:
  }

  const addNewTask = (inputTitle: string) => {
    let newTask = {id: v1(), title: inputTitle, isDone: false}
    setTasks([newTask, ...tasks])
  }

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const setStatus = (status: FilterType) => {
    setFilter(status)
  }


  return (
    <div className="App">
      <Todolist
        toDoListTitle={'What to learn'}
        tasks={filteredTasks}
        removeTask={removeTask}
        setStatus={setStatus}
        addNewTask={addNewTask}
      />
    </div>

  );
}

export default App;
