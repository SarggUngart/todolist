import React from 'react'
import {todoListAPI} from "../api/todolist-api";

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
    // debugger
    todoListAPI.UpdateTodolist('f922381a-8156-4b4c-a08f-2498c71c2d07', '123@@@')
      .then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
  const [state, setState] = React.useState<any>(null)
  React.useEffect(() => {
    todoListAPI.GetTasks('4b772467-ed66-4a80-862d-5af25b2190aa')
      .then(res => setState(res.data))
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
  const [state, setState] = React.useState<any>(null)
  React.useEffect(() => {
    todoListAPI.CreateTask('4b772467-ed66-4a80-862d-5af25b2190aa', 'New task')
      .then(res => setState(res.data))
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
  const [state, setState] = React.useState<any>(null)
  React.useEffect(() => {
    todoListAPI.DeleteTask('4b772467-ed66-4a80-862d-5af25b2190aa', 'dd1cc179-8c84-4a52-8306-0c38551a7398')
      .then(res => setState(res.data))
  }, [])
  return <div>{JSON.stringify(state)}</div>
}


export const ReordetTodolist = () => {
  const [state, setState] = React.useState<any>(null)
  const todolistId = "4b77b551-1338-4bb0-9060-71450b4846bb"
  const putAfterID = "67db7a19-6487-424f-9d4d-f7963dadcbe7"
  React.useEffect(() => {
    todoListAPI.ReorderTodoList(todolistId, putAfterID)
      .then(res => {
        setState(res.data)
      })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

