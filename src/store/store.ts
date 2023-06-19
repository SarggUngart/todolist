import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../redusers/tasks-reduces";
import {todolistReducer} from "../redusers/todolists-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "../redusers/app-reduser";
import {authReducer} from "../redusers/auth-reducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todolistReducer,
  app: appReducer,
  auth: authReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>


export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


//@ts-ignore
window.store = store