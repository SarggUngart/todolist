const initialState: InitialStateType = {
  status: 'idle',
  error: null as null | string,
  isDarkMode: false
}

export const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case "APP/SET-ERROR": {
      return {...state, error: action.error}
    }
    case "APP/SET-STATUS": {
      return {...state, status: action.status}
    }
    case "APP/SET-COLOR-MODE": {
      return {...state, isDarkMode: action.isDarkMode}
    }
    default: {
      return {...state}
    }
  }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
  status: RequestStatusType
  error: string | null
  isDarkMode: boolean
}

export const setLoadingStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setColorModeAC = (isDarkMode: boolean) => ({type: 'APP/SET-COLOR-MODE', isDarkMode} as const)

type AppActionsType =
  | ReturnType<typeof setLoadingStatusAC>
  | ReturnType<typeof setErrorAC>
  | ReturnType<typeof setColorModeAC>


