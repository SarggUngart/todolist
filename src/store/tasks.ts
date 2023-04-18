export const sum = (salary: number, n: number) => salary + n
export const sub = (salary: number, n: number) => salary - n

export type ActionType = {
  type: 'SUM' | 'SUB'
  payload: {
    n: number
  }
}

export type StateType = number


export const salaryReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "SUM":
      return state + action.payload.n
    case "SUB":
      return state - action.payload.n
    default:
      return state
  }
}