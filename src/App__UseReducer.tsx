import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksType, ToDoList} from "./Components/TodoList/ToDoList";
import {v1} from "uuid";
import AddItemForm from "./Components/AddItemForm/AddItemForm";
import {Header} from "./Components/Header/Header";
import {Container, Grid, Paper} from "@mui/material";
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todolistReducer
} from "./reducer/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducer/tasks-reducer";


export type FilteredValueType = 'All' | 'Active' | 'Completed'

export type TodoListsType = {
  id: string,
  title: string,
  filter: FilteredValueType
}


export type TasksStateType = {
  [key: string]: TasksType[]
}

function App__UseReducer() {

  let todolistId1 = v1()
  let todolistId2 = v1()

  let [todoLists, dispatchTodoLists] = useReducer(todolistReducer, [
    {id: todolistId1, title: 'What to learn', filter: 'All'},
    {id: todolistId2, title: 'What to buy', filter: 'All'}
  ])

  const [tasks, dispatchTasks] = useReducer(tasksReducer, {
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "React", isDone: false},
      {id: v1(), title: "Redux", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false}
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "Water", isDone: false},
      {id: v1(), title: "Butter", isDone: false},
      {id: v1(), title: "Salt", isDone: false},
      {id: v1(), title: "Carrot", isDone: false}
    ]
  })

  //TASKS
  const removeTask = (todolistId: string, id: string) => {
    dispatchTasks(removeTaskAC(todolistId, id))
  }

  const addTask = (todolistId: string, title: string) => {
    dispatchTasks(addTaskAC(todolistId, title))
  }

  const updateTaskTitle = (todolistId: string, id: string, newTitle: string) => {
    dispatchTasks(changeTaskTitleAC(todolistId, id, newTitle))
  }

  const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    dispatchTasks(changeTaskStatusAC(todolistId, taskId, isDone))
  }

  //TODOLIST
  const addTodoList = (title: string) => {
    const action = addTodoListAC(title)
    dispatchTasks(action)
    dispatchTodoLists(action)
  }

  const updateTodoListTitle = (todolistId: string, newTitle: string) => {
    dispatchTodoLists(changeTodoListTitleAC(todolistId, newTitle))
  }

  const filteredTasks = (todolistId: string, value: FilteredValueType) => {
    dispatchTodoLists(changeTodoListFilterAC(todolistId, value))
  }

  const removeTodoList = (todolistId: string) => {
    dispatchTasks(removeTodoListAC(todolistId))
    dispatchTodoLists(removeTodoListAC(todolistId))
  }

  return (
    <div className="App">
      <Header/>

      <Container fixed>

        <Grid container style={{padding: '20px'}}>
          <AddItemForm callBack={addTodoList}/>
        </Grid>

        <Grid container spacing={3}>
          {todoLists.map(tl => {
            let tasksForTodoList = tasks[tl.id]
            switch (tl.filter) {
              case 'Completed' :
                tasksForTodoList = tasksForTodoList.filter(el => el.isDone)
                break;
              case 'Active' :
                tasksForTodoList = tasksForTodoList.filter(el => !el.isDone)
                break;
              default: {
              }
            }

            return <Grid key={tl.id} item>
              <Paper style={{padding: '10px'}}>
                <ToDoList
                  key={tl.id}
                  todolistId={tl.id}
                  tasks={tasksForTodoList}
                  title={tl.title}
                  removeTask={removeTask}
                  filteredTasks={filteredTasks}
                  addTask={addTask}
                  changeStatus={changeStatus}
                  filter={tl.filter}
                  removeTodoList={removeTodoList}
                  updateTaskTitle={updateTaskTitle}
                  updateTodoListTitle={updateTodoListTitle}
                />
              </Paper>
            </Grid>
          })}
        </Grid>

      </Container>

    </div>
  )
    ;
}

export default App__UseReducer
