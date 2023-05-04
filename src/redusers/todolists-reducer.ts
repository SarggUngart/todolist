import {FilterType} from "../App";
import {v1} from "uuid";
import {TodoListsType} from "../AppRedux";

export type RemoveTodoListAT = ReturnType<typeof RemoveTodolistAC>

export type AddTodoListAT = ReturnType<typeof AddTodoListAC>

export type ChangeToDoListTitleAT = ReturnType<typeof ChangeToDoListTitleAC>

export type ChangeToDoListFilterAT = ReturnType<typeof ChangeToDoListFilterAC>

export type RootTodoListAT = RemoveTodoListAT | AddTodoListAT | ChangeToDoListTitleAT | ChangeToDoListFilterAT

const initialState: TodoListsType[] = []

export const todolistReducer = (state = initialState, action: RootTodoListAT): TodoListsType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter(tl => tl.tListId !== action.payload.id)

    case "ADD-TODOLIST":
      const newTodoList: TodoListsType = {
        tListId: action.payload.todoListId,
        title: action.payload.todolistTile,
        filter: 'All'
      }
      return [...state, newTodoList]
    case "CHANGE-TODOLIST-TITLE":
      return state.map(tl => tl.tListId === action.payload.todoListId
        ? {...tl, title: action.payload.newTitle}
        : tl)
    case "CHANGE-TODOLIST-FILTER":
      return state.map(tl => tl.tListId === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)

    default:
      return state
  }
}

export const RemoveTodolistAC = (id: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      id
    }
  } as const
}

export const AddTodoListAC = (title: string, todoListId = v1()) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      todolistTile: title,
      todoListId
    }
  } as const
}

export const ChangeToDoListTitleAC = (todoListId: string, newTitle: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
      todoListId,
      newTitle
    }
  } as const
}

export const ChangeToDoListFilterAC = (todolistId: string, filter: FilterType) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
      todolistId,
      filter
    }
  } as const
}