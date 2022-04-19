import {FilteredValueType, TodoListsType} from "../App";
import {v1} from "uuid";

type AddTodolistActionType = {
  type: "ADD-TODOLIST"
  title: string
}

type RemoveTodoListActionType = {
  type: "REMOVE-TODOLIST"
  id: string
}

export type UpdateTodoListTitleType = {
  type: "CHANGE-TODOLIST-TITLE"
  id: string
  newTitle: string
}

export type FilteredTasksType = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilteredValueType
}

export type ActionType = AddTodolistActionType | RemoveTodoListActionType | UpdateTodoListTitleType | FilteredTasksType

export const todolistReducer = (todoLists: TodoListsType[], action: ActionType): TodoListsType[] => {
  switch (action.type) {
    case "ADD-TODOLIST":
      let newTodoListId = v1()
      let newTodoList: TodoListsType = {id: newTodoListId, title:action.title , filter: 'All'}
      return [...todoLists, newTodoList]

    case "REMOVE-TODOLIST":
      return todoLists.filter(el => el.id !== action.id)

    case "CHANGE-TODOLIST-FILTER":
      return todoLists.map(el => el.id === action.id ? {...el, filter: action.filter} : el)

    case "CHANGE-TODOLIST-TITLE":
      return todoLists.map(el => el.id === action.id ? {...el, title: action.newTitle} : el)
    default:
      return todoLists
  }

}