import axios from 'axios'


const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
})

export const todoListAPI = {
  GetTodoLists() {
    return instance.get<TodoListApiType[]>(`todo-lists`)
  },
  CreateTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodoListApiType }>>('todo-lists', {title})
  },
  DeleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },
  UpdateTodolistTitle(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  }
}

export type TodoListApiType = {
  "id": string
  "title": string
  "addedDate"?: Date
  "order"?: number
}


export type GetTasksResponse = {
  items: TaskType[]
  totalCount: number
  error: string
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Complited = 2,
  Draft = 3
}

export enum TaskPriority {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Ungrentlu = 3,
  Later = 4
}

export type TaskType = {
  addedDate: Date
  deadline: Date
  description: string
  id: string
  order: number
  priority: TaskPriority
  startDate: Date
  status: TaskStatuses
  title: string
  todoListId: string
}

export type ResponseType<T = {}> = {
  data: T
  fieldsErrors: []
  messages: string[]
  resultCode: number
}

export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriority
  startDate: Date
  deadline: Date
}
