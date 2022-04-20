import React, {useState} from 'react';
import './App.css';
import {TasksType, ToDoList} from "./Components/TodoList/ToDoList";
import {v1} from "uuid";
import AddItemForm from "./Components/AddItemForm/AddItemForm";
import {Header} from "./Components/Header/Header";
import {Container, Grid, Paper} from "@mui/material";


export type FilteredValueType = 'All' | 'Active' | 'Completed'

export type TodoListsType = {
  id: string,
  title: string,
  filter: FilteredValueType
}


export type TasksStateType = {
  [key: string]: TasksType[]
}

function App() {

  let todolistId1 = v1()
  let todolistId2 = v1()

  let [todoLists, setTodoLists] = useState<TodoListsType[]>([
    {id: todolistId1, title: 'What to learn', filter: 'All'},
    {id: todolistId2, title: 'What to buy', filter: 'All'}
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
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
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id)})
  }

  const addTask = (todolistId: string, title: string) => {
    let newTask = {id: v1(), title, isDone: false}
    setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
  }

  const updateTaskTitle = (todolistId: string, id: string, newTitle: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, title: newTitle} : el)})
  }

  const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone} : el)})
  }

  //TODOLIST

  const addTodoList = (title: string) => {
    let newTodoListId = v1()
    let newTodoList: TodoListsType = {id: newTodoListId, title, filter: 'All'}
    setTodoLists([newTodoList, ...todoLists])
    setTasks({...tasks, [newTodoListId]: []})
  }

  const updateTodoListTitle = (todolistId: string, newTitle: string) => {
    setTodoLists(todoLists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))
  }

  const filteredTasks = (todolistId: string, value: FilteredValueType) => {
    setTodoLists(todoLists.map(el => el.id === todolistId ? {...el, filter: value} : el))
  }

  const removeTodoList = (todolistId: string) => {
    setTodoLists(todoLists.filter(el => el.id !== todolistId))
    delete tasks[todolistId]
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


            return <Grid item>
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

export default App;
