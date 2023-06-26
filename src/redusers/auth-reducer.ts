import {Dispatch} from "redux";
import {SetErrorACType, SetInitAC, SetLoadingStatusAC, SetLoadingStatusACType} from "./app-reduser";
import {authAPI} from "../api/todolist-api";
import {LoginType} from "../components/Login";
import {ResultCode} from "./tasks-reduces";
import {handleServerAppError, handleServerNetworkError} from "../utils/error.utils";
import {clearDataAC, ClearDataAT} from "./todolists-reducer";

const initialState = {
  isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: RooAuthAT): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
}


export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const LoginTC = (data: LoginType) => async (dispatch: Dispatch<RooAuthAT>) => {
  dispatch(SetLoadingStatusAC('loading'))
  try {
    const res = await authAPI.Login(data)
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

export const MeTC = () => async (dispatch: Dispatch<RooAuthAT>) => {
  dispatch(SetLoadingStatusAC('loading'))
  try {
    const res = await authAPI.Me()
    if (res.data.resultCode === ResultCode.SUCCESS) {
      dispatch(setIsLoggedInAC(true))
      dispatch(SetLoadingStatusAC('succeeded'))
    } else {
      handleServerAppError(dispatch, res.data)
    }
  } catch (e) {
    const err = (e as { message: string })
    console.log(err)
    handleServerNetworkError(dispatch, err)
  } finally {
    dispatch(SetInitAC(true))
  }
}

export const LogoutTC = () => async (dispatch: Dispatch<RooAuthAT>) => {
  dispatch(SetLoadingStatusAC('loading'))
  try {
    const res = await authAPI.Logout()
    if (res.data.resultCode === ResultCode.SUCCESS) {
      dispatch(setIsLoggedInAC(false))
      dispatch(SetLoadingStatusAC('succeeded'))
      dispatch(clearDataAC())
    } else {
      handleServerAppError(dispatch, res.data)
    }
  } catch (e) {
    const err = (e as { message: string })
    console.log(err)
    handleServerNetworkError(dispatch, err)
  }
}


export type RooAuthAT =
  ReturnType<typeof setIsLoggedInAC>
  | SetLoadingStatusACType
  | SetErrorACType
  | ReturnType<typeof SetInitAC>
  | ClearDataAT