import {ActionType, salaryReducer, StateType, sub, sum} from "./tasks";


test('sum', () => {
  //1. тестовые данные
  const salary: number = 900;
  const n: number = 200

  //2. тестируемый код
  const res = sum(salary, n)

  //3. проверка результата
  expect(res).toBe(1100)
})

test('sub', () => {
  const salary: number = 900;
  const n: number = 200

  //2. тестируемый код
  const res = sub(salary, n)

  //3. проверка результата
  expect(res).toBe(700)
})

test('reducer SUM', () => {
  const salary: StateType = 1000
  const action: ActionType = {
    type: 'SUM',
    payload: {
      n: 800
    }
  }

  const res = salaryReducer(salary, action)

  expect(res).toBe(1800)
})

test('reducer SUB', () => {
  const salary: StateType = 1000
  const action: ActionType = {
    type: 'SUB',
    payload: {
      n: 800
    }
  }

  const res = salaryReducer(salary, action)

  expect(res).toBe(200)
})