import axios from 'axios'

const settings = {
  withCredentials: true
}

export const todoListAPI = {
  getTodoLists() {
    return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
  },
  CreateTodolist(title: string) {
    return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings)
  },
  DeleteTodolist(todolistId: string) {
    return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
  },
  UpdateTodolistTitle(todolistId: string, title: string) {
    return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings)
  }
}


