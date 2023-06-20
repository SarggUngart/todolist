import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {RootTasksAT, tasksReducer} from "../redusers/tasks-reduces";
import {RootTodoListAT, todolistReducer} from "../redusers/todolists-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer, RootAppAT} from "../redusers/app-reduser";
import {authReducer, RooAuthAT} from "../redusers/auth-reducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todolistReducer,
  app: appReducer,
  auth: authReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>


export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

type AllActionsType = RootTodoListAT & RootTasksAT & RooAuthAT & RootAppAT

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

//@ts-ignore
window.store = store