import axios from 'axios'


const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
})

export const todoListAPI = {
  getTodoLists() {
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
    return instance.get<ResponseType>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
  }
}

export type TodoListApiType = {
  "id": string,
  "title": string,
  "addedDate": Date,
  "order": number
}

export type TaskType = {
  addedDate: Date
  deadline: null
  description: null
  id: string
  order: number
  priority: number
  startDate: null
  status: number
  title: string
  todoListId: string
}

export type ResponseType<T = {}> = {
  data: T
  fieldsErrors: []
  messages: string[]
  resultCode: number
}

