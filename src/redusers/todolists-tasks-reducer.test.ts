import {TasksStateType, todoListsType} from "../App";
import {tasksReducer} from "./tasks-reduces";
import {AddTodoListAC, todolistReducer} from "./todolists-reducer";

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<todoListsType> = [];

  const action = AddTodoListAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todoListId);
  expect(idFromTodolists).toBe(action.payload.todoListId);
});