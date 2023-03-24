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


  const getFilteredTasks = (tasks: TaskType[], filterType: FilterType) => {
    switch (filterType) {
      case "Active":
        return tasks.filter(t => !t.isDone);
      case "Completed":
        return tasks.filter(t => t.isDone);
      default:
        return tasks
    }
  }

  const changeToDoListFilter = (status: FilterType) => {
    setFilter(status)
  }

  const changeStatus = (id: string, isDone: boolean) => {
    setTasks([...tasks.map(t => t.id === id ? {...t, isDone: !isDone} : t)])
  }

  const addNewTask = (inputTitle: string) => {
    let newTask = {id: v1(), title: inputTitle, isDone: false}
    setTasks([newTask, ...tasks])
  }

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
  }


  return (
    <div className="App">
      <Todolist
        toDoListTitle={'What to learn'}
        tasks={getFilteredTasks(tasks, filter)}
        removeTask={removeTask}
        changeToDoListFilter={changeToDoListFilter}
        addNewTask={addNewTask}
        changeStatus={changeStatus}
        filter={filter}
      />
    </div>

  );
}

export default App;
