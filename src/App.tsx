import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}


function App(): JSX.Element {

  const tasks: TaskType[] = [
    {id: 1, title: 'HTML', isDone: true},
    {id: 2, title: 'CSS', isDone: true},
    {id: 3, title: 'JS', isDone: false},
  ]

  return (
    <div className="App">
      <Todolist toDoListTitle={'title 1'} tasks={tasks}/>
    </div>

  );
}

export default App;
