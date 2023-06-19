const initialState = {
  isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
}

export const setIsLoggedInAC = (value: false) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

type ActionsType = ReturnType<typeof setIsLoggedInAC>