import {todoListAPI, TodoListApiType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type RemoveTodoListAT = ReturnType<typeof RemoveTodolistAC>

export type AddTodoListAT = ReturnType<typeof AddTodoListAC>

export type ChangeToDoListTitleAT = ReturnType<typeof ChangeToDoListTitleAC>

export type ChangeToDoListFilterAT = ReturnType<typeof ChangeToDoListFilterAC>

export type SetTodoListsAT = ReturnType<typeof setTodolistsAC>

export type RootTodoListAT =
  | RemoveTodoListAT
  | AddTodoListAT
  | ChangeToDoListTitleAT
  | ChangeToDoListFilterAT
  | SetTodoListsAT

export type FilterType = 'All' | 'Active' | 'Completed'

export type TodolistDomainType = TodoListApiType & {
  filter: FilterType
}

const initialState: TodolistDomainType[] = []

export const todolistReducer = (state = initialState, action: RootTodoListAT): TodolistDomainType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter(tl => tl.id !== action.payload.todoListId)
    case "ADD-TODOLIST":
      return [{...action.payload.todolist, filter: 'All'}, ...state]

    case "CHANGE-TODOLIST-TITLE":
      return state.map(tl => tl.id === action.payload.todoListId
        ? {...tl, title: action.payload.title}
        : tl)
    case "CHANGE-TODOLIST-FILTER":
      return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)

    case "SET-TODOLISTS":
      return action.todoLists.map(tl => {
        return {
          ...tl,
          filter: 'All'
        }
      })
    default:
      return state
  }
}

export const RemoveTodolistAC = (todoListId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      todoListId
    }
  } as const
}

export const AddTodoListAC = (todolist: TodoListApiType) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      todolist
    }
  } as const
}

export const ChangeToDoListTitleAC = (todoListId: string, title: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
      todoListId,
      title
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

export const setTodolistsAC = (todoLists: TodoListApiType []) => {
  return {
    type: 'SET-TODOLISTS',
    todoLists
  } as const
}

export const getTodoListsTC = (() => (dispatch: Dispatch) => {
  todoListAPI.GetTodoLists()
    .then(res => dispatch(setTodolistsAC(res.data)))
})

export const createTodoListTC = ((title: string) => (dispatch: Dispatch) => {
  todoListAPI.CreateTodolist(title)
    .then((res) => dispatch(AddTodoListAC(res.data.data.item)))
})

export const removeTodoListTC = ((todoListId: string) => (dispatch: Dispatch) => {
  todoListAPI.DeleteTodolist(todoListId)
    .then(() => {
      dispatch(RemoveTodolistAC(todoListId))
    })
})

export const updateTodoListTitleTC = ((todoListId: string, title: string) => (dispatch: Dispatch) => {
  todoListAPI.UpdateTodolist(todoListId, title)
    .then(() => {
      dispatch(ChangeToDoListTitleAC(todoListId, title))
    })
})