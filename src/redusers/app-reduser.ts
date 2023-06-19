const initialState: InitialStateType = {
  status: 'idle',
  error: null as null | string,
  isInitialized: false,
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
    case "APP/SET-INITIALIZED": {
      return {...state, isInitialized: action.isInitialized}
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
  isInitialized: boolean
}

export const SetLoadingStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const SetErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const SetColorModeAC = (isDarkMode: boolean) => ({type: 'APP/SET-COLOR-MODE', isDarkMode} as const)
export const SetInitAC = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZED', isInitialized} as const)

export type SetLoadingStatusACType = ReturnType<typeof SetLoadingStatusAC>
export type SetErrorACType = ReturnType<typeof SetErrorAC>
type SetSetColorModeType = ReturnType<typeof SetColorModeAC>


type AppActionsType =
  | ReturnType<typeof SetLoadingStatusAC>
  | ReturnType<typeof SetErrorAC>
  | ReturnType<typeof SetColorModeAC>
  | ReturnType<typeof SetInitAC>


