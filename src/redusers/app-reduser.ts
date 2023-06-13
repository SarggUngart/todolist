const initialState: InitialStateType = {
  status: 'idle',
  error: null
}

export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "APP/SET-ERROR": {
      return {...state, error: action.error}
    }
    case "APP/SET-STATUS": {
      return {...state, status: action.status}
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
}

export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

type ActionsType =
  | ReturnType<typeof setStatusAC>
  | ReturnType<typeof setErrorAC>


