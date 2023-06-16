import {todoListAPI, TodoListApiType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, SetErrorACType, SetLoadingStatusAC, SetLoadingStatusACType} from "./app-reduser";
import {ResultCode} from "./tasks-reduces";
import {handleServerAppError, handleServerNetworkError} from "../utils/error.utils";

export type RemoveTodoListAT = ReturnType<typeof RemoveTodolistAC>
export type AddTodoListAT = ReturnType<typeof AddTodoListAC>
export type ChangeToDoListTitleAT = ReturnType<typeof ChangeToDoListTitleAC>
export type ChangeToDoListFilterAT = ReturnType<typeof ChangeToDoListFilterAC>
export type SetTodoListsAT = ReturnType<typeof setTodoListsAC>
export type ChangeTodoListStatusByIdAT = ReturnType<typeof ChangeTodoListStatusByIdAC>


export type RootTodoListAT =
  | RemoveTodoListAT
  | AddTodoListAT
  | ChangeToDoListTitleAT
  | ChangeToDoListFilterAT
  | SetTodoListsAT
  | ChangeTodoListStatusByIdAT
  | SetLoadingStatusACType
  | SetErrorACType

export type FilterType = 'All' | 'Active' | 'Completed'

export type TodolistDomainType = TodoListApiType & {
  filter: FilterType
  entityStatus: RequestStatusType
}

const initialState: TodolistDomainType[] = []

export const todolistReducer = (state = initialState, action: RootTodoListAT): TodolistDomainType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter(tl => tl.id !== action.payload.todoListId)

    case "ADD-TODOLIST":
      return [{...action.payload.todolist, filter: 'All', entityStatus: 'idle'}, ...state]

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
          filter: 'All',
          entityStatus: 'idle'
        }
      })
    case "CHANGE-TODOLIST-STATUS_BY_ID":
      return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.entityStatus} : tl)

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

export const setTodoListsAC = (todoLists: TodoListApiType[]) => {
  return {
    type: 'SET-TODOLISTS',
    todoLists
  } as const
}

export const ChangeTodoListStatusByIdAC = (todolistId: string, entityStatus: RequestStatusType) => {
  return {
    type: 'CHANGE-TODOLIST-STATUS_BY_ID',
    todolistId,
    entityStatus
  } as const
}




export const getTodoListsTC = (() => (dispatch: Dispatch) => {
  dispatch(SetLoadingStatusAC('loading'))
  todoListAPI.GetTodoLists()
    .then(res => {
      dispatch(setTodoListsAC(res.data))
      dispatch(SetLoadingStatusAC('succeeded'))
    })
    .catch(e => {
      handleServerNetworkError(dispatch, e)
    })
})

export const createTodoListTC = ((title: string, ) => (dispatch: Dispatch<RootTodoListAT>) => {
  dispatch(SetLoadingStatusAC('loading'))
  todoListAPI.CreateTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.SUCCESS) {
        dispatch(AddTodoListAC(res.data.data.item))
        dispatch(SetLoadingStatusAC('succeeded'))
      } else {
        handleServerAppError<{ item: TodoListApiType }>(dispatch, res.data)
      }
    })
    .catch((e) => {
      handleServerNetworkError(dispatch, e)
    })
})

export const removeTodoListTC = ((todoListId: string) => (dispatch: Dispatch<RootTodoListAT>) => {
  dispatch(SetLoadingStatusAC('loading'))
  dispatch(ChangeTodoListStatusByIdAC(todoListId, 'loading'))
  todoListAPI.DeleteTodolist(todoListId)
    .then((res) => {
      if (res.data.resultCode === ResultCode.SUCCESS) {
        dispatch(RemoveTodolistAC(todoListId))
        dispatch(SetLoadingStatusAC('succeeded'))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((e) => {
      handleServerNetworkError(dispatch, e)
    })
})

export const updateTodoListTitleTC = ((todoListId: string, title: string) => (dispatch: Dispatch<RootTodoListAT>) => {
  dispatch(SetLoadingStatusAC('loading'))
  todoListAPI.UpdateTodolist(todoListId, title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.SUCCESS) {
        dispatch(ChangeToDoListTitleAC(todoListId, title))
        dispatch(SetLoadingStatusAC('succeeded'))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch(e => {
      handleServerNetworkError(dispatch, e)
    })
})