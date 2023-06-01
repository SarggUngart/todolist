import React from 'react'
import axios from "axios";
import {todoListAPI} from "../api/todolist-api.ts";

export default {
  title: 'API'
}

const settings = {
  withCredentials: true
}

export const GetTodolists = () => {
  const [state, setState] = React.useState<any>(null)
  React.useEffect(() => {
    todoListAPI.getTodoLists()
      .then(res => setState(res.data))

  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = React.useState<any>(null)
  React.useEffect(() => {
    todoListAPI.CreateTodolist('new_Title!!!')
      .then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = React.useState<any>(null)
  React.useEffect(() => {
    todoListAPI.DeleteTodolist('596e1f25-ae5a-4b55-98a0-42ce22087f28')
      .then(res => setState(res.data))
  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = React.useState<any>(null)
  React.useEffect(() => {
    todoListAPI.UpdateTodolistTitle('d304cb00-b300-450b-8cf2-81870d467ef7', 'SUper@@@')
      .then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const ReordetTodolist = () => {
  const [state, setState] = React.useState<any>(null)
  const todolistId = "983bd76c-6e1d-4b90-a65f-8283935d9995"
  React.useEffect(() => {
    axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/reorder`, {putAfterItemId: null}, settings)
      .then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

