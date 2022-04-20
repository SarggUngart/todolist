import {v1} from 'uuid';
import {FilteredValueType, TodoListsType} from '../App';
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todolistReducer,
} from "./todolist-reducer";

test.skip('correct todolist should be removed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<TodoListsType> = [
    {id: todolistId1, title: "What to learn", filter: "All"},
    {id: todolistId2, title: "What to buy", filter: "All"}
  ]

  const endState = todolistReducer(startState, removeTodoListAC(todolistId1))

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test.skip('correct todolist should be added', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListsType> = [
    {id: todolistId1, title: "What to learn", filter: "All"},
    {id: todolistId2, title: "What to buy", filter: "All"}
  ]

  const endState = todolistReducer(startState, addTodoListAC(newTodolistTitle))

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
});


test.skip('correct todolist should change its name', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListsType> = [
    {id: todolistId1, title: "What to learn", filter: "All"},
    {id: todolistId2, title: "What to buy", filter: "All"}
  ]

  const endState = todolistReducer(startState, changeTodoListTitleAC(todolistId2, newTodolistTitle));

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newFilter: FilteredValueType = "Completed";

  const startState: Array<TodoListsType> = [
    {id: todolistId1, title: "What to learn", filter: "All"},
    {id: todolistId2, title: "What to buy", filter: "All"}
  ]
  // const action: changeTodoListFilterACType = {
  //   type: 'CHANGE-TODOLIST-FILTER',
  //   id: todolistId2,
  //   filter: newFilter
  // };

  const endState = todolistReducer(startState, changeTodoListFilterAC(todolistId2, newFilter));

  expect(endState[0].filter).toBe("All");
  expect(endState[1].filter).toBe(newFilter);
});
