import {AddTodoListAT, RemoveTodoListAT, SetTodoListsAT} from "./todolists-reducer";
import {TasksStateType} from "../AppRedux";
import {TaskPriority, TaskStatuses, TaskType, todoListAPI, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store/store";

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeStatusACType = ReturnType<typeof changeTaskAC>
export type ChangeTitleACType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksACType = ReturnType<typeof setTasksAC>

export type RootTasksAT =
  RemoveTaskACType
  | AddTaskACType
  | ChangeStatusACType
  | ChangeTitleACType
  | AddTodoListAT
  | RemoveTodoListAT
  | SetTodoListsAT
  | SetTasksACType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: RootTasksAT): TasksStateType => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      const copyState = {...state}
      action.todoLists.forEach(tl => {
        copyState[tl.id] = []
      })
      return copyState
    }
    case 'REMOVE-TASK':
      return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
    case 'ADD-TASK':
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
      }
    case "CHANGE-TASK":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId
          ? {...t, ...action.model} : t)
      }
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)
      }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.payload.id]: []
      }
    }
    case 'REMOVE-TODOLIST': {
      const copyState: TasksStateType = {...state}
      delete copyState[action.payload.todoListId]
      return copyState
    }
    case "SET-TASKS": {
      return {
        ...state,
        [action.todoListId]: action.tasks
      }
    }
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

export const addTaskAC = (task: TaskType) => {
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

export const setTasksAC = (todoListId: string, tasks: TaskType[]) => ({
  type: 'SET-TASKS',
  todoListId,
  tasks
} as const)

export const getTasksTC = ((todoListId: string) => (dispatch: Dispatch) => {
  todoListAPI.getTasks(todoListId)
    .then(res => dispatch(setTasksAC(todoListId, res.data.items)))
})

export const removeTaskTC = ((todoListId: string, taskId: string) => (dispatch: Dispatch) => {
  todoListAPI.deleteTask(todoListId, taskId)
    .then(() => dispatch(removeTaskAC(todoListId, taskId)))
})

export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
  todoListAPI.createTask(todoListId, title)
    .then((res) => dispatch(addTaskAC(res.data.data.item)))
}

interface FLexTaskType {
  title?: string
  description?: string
  priority?: TaskPriority
  startDate?: Date,
  deadline?: Date,
  status?: TaskStatuses
}

export const updateTaskTC = (todoListId: string, taskId: string, data: FLexTaskType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

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

    todoListAPI.updateTask(todoListId, taskId, model)
      .then(() => dispatch(changeTaskAC(todoListId, taskId, model)))
  }
}