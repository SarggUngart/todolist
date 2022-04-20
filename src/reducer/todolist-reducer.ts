import {FilteredValueType, TodoListsType} from "../App";
import {v1} from "uuid";


export const todolistReducer = (state: TodoListsType[], action: TodoListReducerType) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST' : {
      return state.filter(el => el.id !== action.payload.id)
    }
    case 'ADD-TODOLIST' : {
      let newTodoListId = v1()
      let newTodoList: TodoListsType = {id: newTodoListId, title: action.payload.title, filter: 'All'}
      return [...state, newTodoList]
    }
    case 'CHANGE-TODOLIST-TITLE' : {
      return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.newTitle} : el)
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
    }

    default:
      return state
  }
}

export type TodoListReducerType =
  removeTodoListACType
  | addTodoListACACType
  | changeTodoListTitleACType
  | changeTodoListFilterACType


type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (id: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      id
    }
  } as const
}

type addTodoListACACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      title
    }
  } as const
}

export type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (id: string, newTitle: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
      id, newTitle
    }
  } as const
}

export type changeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC = (id: string, filter: FilteredValueType) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
      id, filter
    }
  } as const
}