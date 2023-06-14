import {SetErrorAC, SetErrorType, SetLoadingStatusAC, SetLoadingStatusType} from "../redusers/app-reduser";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api";


export const handleServerAppError = <T>(dispatch: Dispatch<ErrorUtilsDispatchType>, data: ResponseType<T>) => {
  if (data.messages.length) {
    dispatch(SetErrorAC(data.messages[0]))
  } else {
    dispatch(SetErrorAC('some error'))
  }
  dispatch(SetLoadingStatusAC('failed'))
}


export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, error: { message: string }) => {
  dispatch(SetErrorAC(error.message))
  dispatch(SetLoadingStatusAC('failed'))
}


type ErrorUtilsDispatchType = SetLoadingStatusType | SetErrorType