import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../redusers/tasks-reduces";
import {todolistReducer} from "../redusers/todolists-reducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todolistReducer
})

export const store = legacy_createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store