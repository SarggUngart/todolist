import {FilterType, todoListsType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = ReturnType<typeof RemoveTodolistAC>

export type AddTodoListAT = ReturnType<typeof AddTodoListAC>

export type ChangeToDoListTitleAT = ReturnType<typeof ChangeToDoListTitleAC>

export type ChangeToDoListFilterAT = ReturnType<typeof ChangeToDoListFilterAC>

export type RootAT = RemoveTodoListAT | AddTodoListAT | ChangeToDoListTitleAT | ChangeToDoListFilterAT


export const todolistReducer = (todoLists: todoListsType[], action: RootAT): todoListsType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return todoLists.filter(tl => tl.id !== action.payload.id)
    case "ADD-TODOLIST":
      const newTodoList: todoListsType = {
        id: v1(),
        title: action.payload.todolistTile,
        filter: 'All'
      }
      return [...todoLists, newTodoList]
    case "CHANGE-TODOLIST-TITLE":
      return todoLists.map(tl => tl.id === action.payload.todoListId
        ? {...tl, title: action.payload.newTitle}
        : tl)
    case "CHANGE-TODOLIST-FILTER":
      return todoLists.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)

    default:
      return todoLists
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

export const AddTodoListAC = (title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      todolistTile: title
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