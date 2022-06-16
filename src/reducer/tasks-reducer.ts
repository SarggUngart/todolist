import {TasksStateType} from '../App';
import {v1} from "uuid";
import {addTodoListACType, removeTodoListACType} from "./todolist-reducer";

export type ActionsType =
  RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | addTodoListACType
  | removeTodoListACType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
      }

    }
    case "ADD-TASK": {
      const newTask = {id: v1(), title: action.title, isDone: false}
      return {
        ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]]
      }
    }
    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId
          ? {...el, isDone: action.isDone}
          : el)
      }
    }
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(el => el.id === action.id
          ? {...el, title: action.newTitle}
          : el)
      }
    case "ADD-TODOLIST":
      return {
        ...state,
        [action.payload.toDolistId]: []
      }
    case "REMOVE-TODOLIST": {
      const copyState = {...state}
      delete copyState[action.payload.id]
      return copyState
    }

    default:
      return state
  }
}

export const removeTaskAC = (todolistId: string, taskId: string) =>
  ({type: 'REMOVE-TASK', taskId, todolistId}) as const
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export const addTaskAC = (todolistId: string, title: string) => ({type: 'ADD-TASK', todolistId, title}) as const
export type AddTaskActionType = ReturnType<typeof addTaskAC>

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => ({
  type: 'CHANGE-TASK-STATUS',
  todolistId,
  taskId,
  isDone
}) as const
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskTitleAC = (todolistId: string, id: string, newTitle: string) => ({
  type: "CHANGE-TASK-TITLE",
  todolistId,
  id,
  newTitle
}) as const
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
