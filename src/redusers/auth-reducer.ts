import {Dispatch} from "redux";
import {SetErrorACType, SetLoadingStatusAC, SetLoadingStatusACType} from "./app-reduser";
import {authAPI} from "../api/todolist-api";
import {LoginType} from "../components/Login";
import {ResultCode} from "./tasks-reduces";
import {handleServerAppError, handleServerNetworkError} from "../utils/error.utils";

const initialState = {
  isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
}


export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const LoginTC = (data: LoginType) => async (dispatch: Dispatch<ActionsType>) => {
  dispatch(SetLoadingStatusAC('loading'))
  const res = await authAPI.Login(data)
  try {
    if (res.data.resultCode === ResultCode.SUCCESS) {
      dispatch(setIsLoggedInAC(true))
      dispatch(SetLoadingStatusAC('succeeded'))
    } else {
      handleServerAppError(dispatch, res.data)
    }
  } catch (e) {
    const err = (e as { message: string })
    handleServerNetworkError(dispatch, err)
  }
}

type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetLoadingStatusACType | SetErrorACType