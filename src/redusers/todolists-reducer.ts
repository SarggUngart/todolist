import {todoListAPI, TodoListApiType} from "../api/todolist-api";
import {RequestStatusType, SetErrorACType, SetLoadingStatusAC, SetLoadingStatusACType} from "./app-reduser";
import {getTasksTC, ResultCode} from "./tasks-reduces";
import {handleServerAppError, handleServerNetworkError} from "../utils/error.utils";
import {AppThunk} from "../store/store";

export type RemoveTodoListAT = ReturnType<typeof removeTodolistAC>
export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type ChangeToDoListTitleAT = ReturnType<typeof changeToDoListTitleAC>
export type ChangeToDoListFilterAT = ReturnType<typeof changeToDoListFilterAC>
export type SetTodoListsAT = ReturnType<typeof setTodoListsAC>
export type ChangeTodoListStatusByIdAT = ReturnType<typeof changeTodoListStatusByIdAC>
export type ClearDataAT = ReturnType<typeof clearDataAC>


export type RootTodoListAT =
  | RemoveTodoListAT
  | AddTodoListAT
  | ChangeToDoListTitleAT
  | ChangeToDoListFilterAT
  | SetTodoListsAT
  | ChangeTodoListStatusByIdAT
  | SetLoadingStatusACType
  | SetErrorACType
  | ClearDataAT


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

    case "CLEAR-DATA": {
      return []
    }

    default:
      return state
  }
}

export const removeTodolistAC = (todoListId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      todoListId
    }
  } as const
}

export const addTodoListAC = (todolist: TodoListApiType) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      todolist
    }
  } as const
}

export const changeToDoListTitleAC = (todoListId: string, title: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
      todoListId,
      title
    }
  } as const
}

export const changeToDoListFilterAC = (todolistId: string, filter: FilterType) => {
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

export const changeTodoListStatusByIdAC = (todolistId: string, entityStatus: RequestStatusType) => {
  return {
    type: 'CHANGE-TODOLIST-STATUS_BY_ID',
    todolistId,
    entityStatus
  } as const
}


export const clearDataAC = () => ({type: 'CLEAR-DATA'} as const)


export const getTodoListsTC = (): AppThunk => async dispatch => {
  dispatch(SetLoadingStatusAC('loading'))
  const res = await todoListAPI.GetTodoLists()
  try {
    dispatch(setTodoListsAC(res.data))
    dispatch(SetLoadingStatusAC('succeeded'))
    res.data.forEach(tl => {
      dispatch(getTasksTC(tl.id))
    })
  } catch (e) {
    const err = e as { message: string }
    handleServerNetworkError(dispatch, err)
  }
}

export const createTodoListTC = ((title: string,): AppThunk => (dispatch) => {
  dispatch(SetLoadingStatusAC('loading'))
  todoListAPI.CreateTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.SUCCESS) {
        dispatch(addTodoListAC(res.data.data.item))
        dispatch(SetLoadingStatusAC('succeeded'))
      } else {
        handleServerAppError<{ item: TodoListApiType }>(dispatch, res.data)
      }
    })
    .catch((e) => {
      handleServerNetworkError(dispatch, e)
    })
})

export const removeTodoListTC = ((todoListId: string): AppThunk => (dispatch) => {
  dispatch(SetLoadingStatusAC('loading'))
  dispatch(changeTodoListStatusByIdAC(todoListId, 'loading'))
  todoListAPI.DeleteTodolist(todoListId)
    .then((res) => {
      if (res.data.resultCode === ResultCode.SUCCESS) {
        dispatch(removeTodolistAC(todoListId))
        dispatch(SetLoadingStatusAC('succeeded'))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((e) => {
      handleServerNetworkError(dispatch, e)
    })
})

export const updateTodoListTitleTC = ((todoListId: string, title: string): AppThunk => (dispatch) => {
  dispatch(SetLoadingStatusAC('loading'))
  todoListAPI.UpdateTodolist(todoListId, title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.SUCCESS) {
        dispatch(changeToDoListTitleAC(todoListId, title))
        dispatch(SetLoadingStatusAC('succeeded'))
        todoListAPI.GetTodoLists()
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch(e => {
      handleServerNetworkError(dispatch, e)
    })
})

export const reorderTodoListTC = ((todoListId: string, putAfterID: string): AppThunk => (dispatch) => {
  dispatch(SetLoadingStatusAC('loading'))
  todoListAPI.ReorderTodoList(todoListId, putAfterID)
    .then((res) => {
      if (res.data.resultCode === ResultCode.SUCCESS) {
        dispatch(SetLoadingStatusAC('succeeded'))
        dispatch(getTodoListsTC())
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch(e => {
      handleServerNetworkError(dispatch, e)
    })
})