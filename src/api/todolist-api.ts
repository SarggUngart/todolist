import axios, {AxiosResponse} from 'axios'
import {RequestStatusType} from "../redusers/app-reduser";
import {LoginType} from "../components/Login";


const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
})


export const authAPI = {
  Login(data: LoginType) {
    return instance.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{
      userId: number
    }>>, LoginType>('auth/login', data);
  },
  Logout(){
    return instance.delete<ResponseType>('auth/login')
  }
  ,
  Me() {
    return instance.get<ResponseType<MeType>>('auth/me')
  }
}

export const todoListAPI = {
  GetTodoLists() {
    return instance.get<TodoListApiType[]>('todo-lists');
  },
  CreateTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodoListApiType }>, AxiosResponse<ResponseType<{
      item: TodoListApiType
    }>>, { title: string }>('todo-lists', {title});
  },
  DeleteTodolist(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id  }`);
  },
  UpdateTodolist(id: string, title: string) {
    return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${id}`, {title});
  },
  GetTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  DeleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  CreateTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskApiType }>, AxiosResponse<ResponseType<{ item: TaskApiType }>>, {
      title: string
    }>(`todo-lists/${todolistId}/tasks`, {title});
  },
  UpdateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<{ item: TaskApiType }>, AxiosResponse<ResponseType<{
      item: TaskApiType
    }>>, UpdateTaskModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  }
}

export type TodoListApiType = {
  "id": string
  "title": string
  "addedDate"?: Date | string
  "order"?: number
}

export type MeType = {
  id: number
  email: string
  login: string
}

export type GetTasksResponse = {
  items: TaskApiType[]
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

export type TaskApiType = {
  addedDate: Date | string
  deadline: Date | string
  description: string
  id: string
  order: number
  priority: TaskPriority
  startDate: Date | string
  status: TaskStatuses
  title: string
  todoListId: string
  entityStatus: RequestStatusType
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
  startDate: Date | string
  deadline: Date | string
}

