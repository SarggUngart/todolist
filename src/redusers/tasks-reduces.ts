import {AddTodoListAT, ClearDataAT, RemoveTodoListAT, SetTodoListsAT} from "./todolists-reducer";
import {TaskApiType, TaskPriority, TaskStatuses, todoListAPI, UpdateTaskModelType} from "../api/todolist-api";
import {AppRootStateType, AppThunk} from "../store/store";
import {RequestStatusType, SetErrorACType, SetLoadingStatusAC, SetLoadingStatusACType} from "./app-reduser";
import {handleServerAppError, handleServerNetworkError} from "../utils/error.utils";


export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeStatusACType = ReturnType<typeof changeTaskAC>
export type ChangeTitleACType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksACType = ReturnType<typeof setTasksAC>
export type ChangeTaskAPIStatusACType = ReturnType<typeof changeTaskAPIStatusAC>

export type RootTasksAT =
  RemoveTaskACType
  | AddTaskACType
  | ChangeStatusACType
  | ChangeTitleACType
  | AddTodoListAT
  | RemoveTodoListAT
  | SetTodoListsAT
  | SetTasksACType
  | SetLoadingStatusACType
  | SetErrorACType
  | ChangeTaskAPIStatusACType
  | ClearDataAT

export type TasksStateType = {
  [tdListId: string]: TaskDomainType[]
}

export type TaskDomainType = TaskApiType & {
  entityStatus: RequestStatusType
}

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: RootTasksAT): TasksStateType => {
  switch (action.type) {
    case "SET-TASKS": {
      return {
        ...state,
        [action.todoListId]: action.tasks
          .map(t => ({...t, entityStatus: 'idle'}))
      }
    }
    case 'ADD-TASK':
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
          .map(t => ({
            ...t,
            entityStatus: 'idle'
          }))
      }
    case 'REMOVE-TASK':
      return {
        ...state, [action.todoListId]: state[action.todoListId]
          .filter(t => t.id !== action.taskId)
      }
    case "CHANGE-TASK":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId]
          .map(t => t.id === action.taskId
            ? {...t, ...action.model}
            : t)
      }
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId]
          .map(t => t.id === action.taskId
            ? {...t, title: action.title}
            : t)
      }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.payload.todolist.id]: []
      }
    }
    case 'REMOVE-TODOLIST': {
      const copyState: TasksStateType = {...state}
      delete copyState[action.payload.todoListId]
      return copyState
      // const {[action.payload.todoListId]: [], ...rest} = state
      // return rest;
    }
    case "SET-TODOLISTS": {
      const copyState = {...state}
      action.todoLists.forEach(tl => {
        copyState[tl.id] = []
      })
      return copyState
    }
    case "CHANGE-TASK-API-STATUS": {
      return {
        ...state,
        [action.todoListId]: state[action.todoListId]
          .map(t => t.id === action.tasksId
            ? {...t, entityStatus: action.entityStatus}
            : t)
      }
    }
    case "CLEAR-DATA":
      return {}
    default:
      return state
  }
}

export const removeTaskAC = (todoListId: string, taskId: string) => {
  return {
    type: 'REMOVE-TASK',
    taskId,
    todoListId
  } as const
}

export const addTaskAC = (task: TaskDomainType) => {
  return {
    type: 'ADD-TASK',
    task
  } as const
}

export const changeTaskAC = (todoListId: string, taskId: string, model: UpdateTaskModelType) => {
  return {
    type: 'CHANGE-TASK',
    todoListId,
    taskId,
    model
  } as const
}

export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string,) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    taskId,
    title,
    todoListId
  } as const
}

export const setTasksAC = (todoListId: string, tasks: TaskDomainType[]) => ({
  type: 'SET-TASKS',
  todoListId,
  tasks
} as const)

export const changeTaskAPIStatusAC = (todoListId: string, tasksId: string, entityStatus: RequestStatusType) => ({
  type: 'CHANGE-TASK-API-STATUS',
  todoListId,
  tasksId,
  entityStatus
} as const)


export const getTasksTC = ((todoListId: string): AppThunk => (dispatch) => {
  dispatch(SetLoadingStatusAC('loading'))
  todoListAPI.GetTasks(todoListId)
    .then(res => {
      dispatch(setTasksAC(todoListId, res.data.items))
      dispatch(SetLoadingStatusAC('succeeded'))
    })
    .catch(e => {
      handleServerNetworkError(dispatch, e)
    })
})

export const removeTaskTC = ((todoListId: string, taskId: string): AppThunk => (dispatch) => {
  dispatch(SetLoadingStatusAC('loading'))
  dispatch(changeTaskAPIStatusAC(todoListId, taskId, 'loading'))
  todoListAPI.DeleteTask(todoListId, taskId)
    .then((res) => {
        if (res.data.resultCode === ResultCode.SUCCESS) {
          dispatch(removeTaskAC(todoListId, taskId))
          dispatch(SetLoadingStatusAC('succeeded'))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      }
    ).catch((e) => {
    handleServerNetworkError(dispatch, e)
  })
})

export enum ResultCode {
  SUCCESS = 0,
  ERROR = 1,
  ERROR_CAPTCHA = 10
}

export const addTaskTC = (todoListId: string, title: string): AppThunk => (dispatch) => {
  dispatch(SetLoadingStatusAC('loading'))
  todoListAPI.CreateTask(todoListId, title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.SUCCESS) {
        dispatch(addTaskAC(res.data.data.item))
        dispatch(SetLoadingStatusAC('succeeded'))
      } else {
        handleServerAppError<{ item: TaskApiType }>(dispatch, res.data)
      }
    })
    .catch((e) => {
      handleServerNetworkError(dispatch, e)
    })
}

interface FLexTaskType {
  title?: string
  description?: string
  priority?: TaskPriority
  startDate?: Date,
  deadline?: Date,
  status?: TaskStatuses
}


export const updateTaskTC = (todoListId: string, taskId: string, data: FLexTaskType): AppThunk => (dispatch, getState: () => AppRootStateType) => {

  const task = getState().tasks[todoListId].find(t => t.id === taskId)

  if (task) {
    const model: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
      ...data
    }
    dispatch(SetLoadingStatusAC('loading'))
    // dispatch(changeTaskAPIStatusAC(todoListId, taskId, 'loading'))
    todoListAPI.UpdateTask(todoListId, taskId, model)
      .then((res) => {
        if (res.data.resultCode === ResultCode.SUCCESS) {
          dispatch(changeTaskAC(todoListId, taskId, model))
          dispatch(SetLoadingStatusAC('succeeded'))
          // dispatch(changeTaskAPIStatusAC(todoListId, taskId, 'succeeded'))
        } else {
          handleServerAppError<{ item: TaskApiType }>(dispatch, res.data)
        }
      })
      .catch((e) => {
        handleServerNetworkError(dispatch, e)
      })
  }
}