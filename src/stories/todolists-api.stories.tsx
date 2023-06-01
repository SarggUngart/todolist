import React from 'react'
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
    axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
      .then(res => setState(res.data))

  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = React.useState<any>(null)
  React.useEffect(() => {
    const data = {title: '---title123321---'}
    axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/`, data, settings)
      .then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = React.useState<any>(null)
  React.useEffect(() => {
    const todolistId = "bd506b1f-11d4-4120-8d2e-6c70bce8fe9c"
    axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
      .then(res => setState(res.data))
  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = React.useState<any>(null)
  const todolistId = "d304cb00-b300-450b-8cf2-81870d467ef7"
  const data = {title: `ХО-ХО-ХО-ХО-ХО`}
  React.useEffect(() => {
    axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, data, settings)
      .then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

