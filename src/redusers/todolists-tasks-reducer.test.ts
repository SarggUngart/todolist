import {TasksStateType} from "../old/App";
import {tasksReducer} from "./tasks-reduces";
import {AddTodoListAC, todolistReducer} from "./todolists-reducer";
import {TodoListsType} from "../AppRedux";

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodoListsState: TodoListsType[] = [];

  const action = AddTodoListAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodoListsState = todolistReducer(startTodoListsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodoLists = endTodoListsState[0].tListId;

  expect(idFromTasks).toBe(action.payload.todoListId);
  expect(idFromTodoLists).toBe(action.payload.todoListId);
});