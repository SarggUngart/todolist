import {
  AddTodoListAC,
  ChangeToDoListFilterAC,
  ChangeToDoListTitleAC,
  RemoveTodolistAC,
  todolistReducer
} from "./todolists-reducer";
import {FilterType, TasksStateType} from "../old/App";
import {v1} from "uuid";
import {tasksReducer} from "./tasks-reduces";
import {TodoListsType} from "../AppRedux";

let todolistId1: string;

let todolistId2: string;

let startState: TodoListsType[];

let newTodolistTitle: string
let newFilter: FilterType

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = [
    {tListId: todolistId1, title: "What to learn", filter: "All"},
    {tListId: todolistId2, title: "What to buy", filter: "All"}
  ]

  newTodolistTitle = "New Todolist";
  newFilter = 'Completed'

})

test('correct todolist should be removed', () => {
  const endState = todolistReducer(startState, RemoveTodolistAC(todolistId1))

  expect(endState.length).toBe(1);
  expect(endState[0].tListId).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  const endState = todolistReducer(startState, AddTodoListAC(newTodolistTitle))

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
  const endState = todolistReducer(startState, ChangeToDoListTitleAC(todolistId2, newTodolistTitle));

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

  const endState = todolistReducer(startState, ChangeToDoListFilterAC(todolistId2, newFilter))

  expect(endState[0].filter).toBe('All')
  expect(endState[1].filter).toBe(newFilter)
})

test('property with todolistId should be deleted', () => {
  const startState: TasksStateType = {
    "todolistId1": [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    "todolistId2": [
      {id: "1", title: "bread", isDone: false},
      {id: "2", title: "milk", isDone: true},
      {id: "3", title: "tea", isDone: false}
    ]
  };

  const endState = tasksReducer(startState, RemoveTodolistAC("todolistId2"))

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});