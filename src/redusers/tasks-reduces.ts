import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";
import {TasksStateType} from "../AppRedux";
import {TaskStatuses, TaskType} from "../api/todolist-api";

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeStatusACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTitleACType = ReturnType<typeof changeTaskTitleAC>

export type RootTasksAT =
  RemoveTaskACType
  | AddTaskACType
  | ChangeStatusACType
  | ChangeTitleACType
  | AddTodoListAT
  | RemoveTodoListAT

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: RootTasksAT): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
    case 'ADD-TASK':
      const newTask: TaskType = {id: v1(), title: action.title, status: TaskStatuses.New}
      return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
    case "CHANGE-TASK-STATUS":
                return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId
          ? {...t, status:  action.status} : t)
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
    case 'REMOVE-TODOLIST':
      const copyState: TasksStateType = {...state}
      delete copyState[action.payload.id]
      return copyState

    default:
      return state
  }
}

export const removeTaskAC = (taskId: string, todoListId: string) => {
  return {
    type: 'REMOVE-TASK',
    taskId,
    todoListId
  } as const
}

export const addTaskAC = (title: string, todoListId: string) => {
  return {
    type: 'ADD-TASK',
    title,
    todoListId
  } as const
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListId: string) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    taskId,
    status,
    todoListId
  } as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    taskId,
    title,
    todoListId
  } as const
}