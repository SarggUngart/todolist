import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";

type todoListsType = {
  id: string
  title: string
  filter: FilterType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type tasksStateType = {
  [tdListId: string]: TaskType[]
}

export type FilterType = 'All' | 'Active' | 'Completed'

function App(): JSX.Element {
  const tdList1 = v1()
  const tdList2 = v1()

  const [todoLists, setTodoLists] = React.useState<todoListsType[]>([
      {id: tdList1, title: 'what to learn', filter: 'All'},
      {id: tdList2, title: 'what to buy', filter: 'All'}
    ]
  )

  const [tasks, setTasks] = React.useState<tasksStateType>({
    [tdList1]: [
      {id: v1(), title: 'HTML', isDone: true},
      {id: v1(), title: 'CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: false},
    ],
    [tdList2]: [
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'Water', isDone: true},
      {id: v1(), title: 'Book', isDone: false},
      {id: v1(), title: 'Beer', isDone: false}
    ],
  })

  const getFilteredTasks = (tasks: TaskType[], filter: FilterType) => {
    switch (filter) {
      case "Active":
        return tasks.filter(t => !t.isDone);
      case "Completed":
        return tasks.filter(t => t.isDone);
      default:
        return tasks
    }
  }

  const changeToDoListFilter = (todolistId: string, filter: FilterType) => {
    setTodoLists(todoLists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
  }

  const changeStatus = (todolistId: string, id: string, isDone: boolean) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, isDone: !isDone} : t)})
  }

  const addNewTask = (todolistId: string, inputTitle: string) => {
    const newTask: TaskType = {id: v1(), title: inputTitle, isDone: false}
    setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
  }

  const removeTask = (todolistId: string, id: string) => {
    // const tasksForUpdate: TaskType[] = tasks[todolistId]
    // const resultOfUpdate: TaskType[] = tasksForUpdate.filter(t => t.id !== id)
    // const copyTasks = {...tasks}
    // copyTasks[todolistId] = resultOfUpdate
    // setTasks(copyTasks)
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})
  }

  const removeTodoList = (todolistId: string) => {
    setTodoLists(todoLists.filter(tl => tl.id !== todolistId))
    delete tasks[todolistId]
  }

  return (
    <div className="App">
      {todoLists.map(tl => {
        return (
          <Todolist key={tl.id}
                    tListId={tl.id}
                    toDoListTitle={tl.title}
                    filter={tl.filter}
                    tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                    removeTodoList={removeTodoList}
                    removeTask={removeTask}
                    changeToDoListFilter={changeToDoListFilter}
                    addNewTask={addNewTask}
                    changeStatus={changeStatus}
          />
        )
      })}
    </div>
  );
}

export default App;
