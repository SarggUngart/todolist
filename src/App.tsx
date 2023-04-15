import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {InputBtn} from "./components/InputBtn";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

type todoListsType = {
  id: string
  title: string
  filter: FilterType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type tasksStateType = {
  [tdListId: string]: TaskType[]
}

export type FilterType = 'All' | 'Active' | 'Completed'

function App(): JSX.Element {
  const tdList1 = v1()
  const tdList2 = v1()

  const [todoLists, setTodoLists] = React.useState<todoListsType[]>([
      {id: tdList1, title: 'what to learn', filter: 'All'},
      {id: tdList2, title: 'what to buy', filter: 'All'}
    ]
  )

  const [tasks, setTasks] = React.useState<tasksStateType>({
    [tdList1]: [
      {id: v1(), title: 'HTML', isDone: true},
      {id: v1(), title: 'CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: false},
    ],
    [tdList2]: [
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'Water', isDone: true},
      {id: v1(), title: 'Book', isDone: false},
      {id: v1(), title: 'Beer', isDone: false}
    ],
  })

  const getFilteredTasks = (tasks: TaskType[], filter: FilterType) => {
    switch (filter) {
      case "Active":
        return tasks.filter(t => !t.isDone);
      case "Completed":
        return tasks.filter(t => t.isDone);
      default:
        return tasks
    }
  }

  const changeToDoListFilter = (todolistId: string, filter: FilterType) => {
    setTodoLists(todoLists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
  }

  const changeStatus = (todolistId: string, id: string, isDone: boolean) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, isDone: !isDone} : t)})
  }

  const addNewTask = (todolistId: string, inputTitle: string) => {
    const newTask: TaskType = {id: v1(), title: inputTitle, isDone: false}
    setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
  }

  const removeTask = (todolistId: string, id: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})
  }

  const changeTaskTitle = (todolistId: string, id: string, newTaskTitle: string) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, title: newTaskTitle} : t)})
  }

  const removeTodoList = (todolistId: string) => {
    setTodoLists(todoLists.filter(tl => tl.id !== todolistId))
    delete tasks[todolistId]
  }

  const addNewTodoList = (todolistTile: string) => {
    const newTodoList: todoListsType = {
      id: v1(),
      title: todolistTile,
      filter: 'All'
    }
    setTodoLists([...todoLists, newTodoList])
    setTasks({[newTodoList.id]: [], ...tasks})
  }

  const changeTodoListTitle = (todoListId: string, newTitle: string) => {
    setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: newTitle} : tl))
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            TodoLists
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid container sx={{padding: '20px 0 50px 0'}}>
          <InputBtn addNewTask={addNewTodoList}/>
        </Grid>

        <Grid container spacing={8}>
          {todoLists.map(tl => {
            return (
              <Grid item>
                <Paper elevation={8} sx={{p:'20px'}}>
                  <Todolist key={tl.id}
                            tListId={tl.id}
                            toDoListTitle={tl.title}
                            filter={tl.filter}
                            tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                            removeTodoList={removeTodoList}
                            removeTask={removeTask}
                            changeToDoListFilter={changeToDoListFilter}
                            addNewTask={addNewTask}
                            changeStatus={changeStatus}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
