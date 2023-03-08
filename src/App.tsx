import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

export type FilterType = 'All' | 'Active' | 'Completed'

function App(): JSX.Element {

  let [tasks, setTasks] = useState<TaskType[]>([
    {id: 1, title: 'HTML', isDone: true},
    {id: 2, title: 'CSS', isDone: true},
    {id: 3, title: 'JS', isDone: false},
  ])

  const [filter, setFilter] = useState<FilterType>('All')

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

  const removeTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const setStatus = (status: FilterType) => {
    setFilter(status)
  }

  return (
    <div className="App">
      <Todolist
        toDoListTitle={'title 1'}
        tasks={filteredTasks}
        removeTask={removeTask}
        setStatus={setStatus}
      />
    </div>

  );
}

export default App;
