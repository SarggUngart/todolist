import React from 'react'
import {todoListAPI, UpdateTaskModelType} from "../api/todolist-api";
import axios from "axios";

export default {
  title: 'API'
}

const settings = {
  withCredentials: true
}

export const GetTodolists = () => {
  const [state, setState] = React.useState<any>(null)
  React.useEffect(() => {
    todoListAPI.GetTodoLists()
      .then(res => setState(res.data))

  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = React.useState<any>(null)
  const onClickNewTodoList = () => {
    setState(todoListAPI.CreateTodolist('new title 123')
      .then(res => res.data))
  }
  return <div>
    {JSON.stringify(state)}<br/>
    <button onClick={onClickNewTodoList}>add todoList</button>
  </div>
}

export const DeleteTodolist = () => {
  const [state, setState] = React.useState<any>(null)
  React.useEffect(() => {
    todoListAPI.DeleteTodolist('9257653c-35e9-4aac-9aef-885ca4625b8b')
      .then(res => setState(res.data))
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = React.useState<any>(null)
  React.useEffect(() => {
    todoListAPI.UpdateTodolistTitle('be7ad918-7232-423a-b980-0bd714ce79f0', 'SUper@@@')
      .then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
  const [state, setState] = React.useState<any>(null)
  React.useEffect(() => {
    todoListAPI.getTasks('4b772467-ed66-4a80-862d-5af25b2190aa')
      .then(res => setState(res.data))
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
  const [state, setState] = React.useState<any>(null)
  React.useEffect(() => {
    todoListAPI.createTask('4b772467-ed66-4a80-862d-5af25b2190aa', 'New task')
      .then(res => setState(res.data))
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
  const [state, setState] = React.useState<any>(null)
  React.useEffect(() => {
    todoListAPI.deleteTask('4b772467-ed66-4a80-862d-5af25b2190aa', 'dd1cc179-8c84-4a52-8306-0c38551a7398')
      .then(res => setState(res.data))
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

// export const UpdateTask =()=>{
//   const [state, setState] = React.useState<any>(null)
//   React.useEffect(() => {
//     const model: UpdateTaskModelType = {
//       title: task.title,
//       description: task.description,
//       priority: task.priority,
//       startDate: task.startDate,
//       deadline: task.deadline,
//       status
//     }
//
//     todoListAPI.updateTask('4b772467-ed66-4a80-862d-5af25b2190aa', 'f692f0f3-012f-4db9-a60e-cce90acb123a', model)
//       .then(res => setState(res.data))
//   }, [])
//   return <div>{JSON.stringify(state)}</div>
// }

export const ReordetTodolist = () => {
  const [state, setState] = React.useState<any>(null)
  const todolistId = "983bd76c-6e1d-4b90-a65f-8283935d9995"
  React.useEffect(() => {
    axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/reorder`, {putAfterItemId: null}, settings)
      .then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

