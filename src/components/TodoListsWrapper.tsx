import React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodoLists} from "./Todolists";
import {createTodoListTC, getTodoListsTC, TodolistDomainType} from "../redusers/todolists-reducer";
import {useAppDispatch, useAppSelector} from "../store/store";
import {InputWithBtn} from "./InputWithBtn";
import {Navigate} from "react-router-dom";


export const TodoListsWrapper = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const todoLists = useAppSelector<TodolistDomainType[]>(state => state.todoLists)
  const dispatch = useAppDispatch()


  React.useEffect(() => {
    if (!isLoggedIn) return
    dispatch(getTodoListsTC())
  }, [])

  const addNewTodoList = React.useCallback((title: string) => {
    dispatch(createTodoListTC(title))
  }, [dispatch])

  if (!isLoggedIn) {
    return <Navigate to={'/login'}/>
  }

  return (
    <>
      <Grid container style={{margin: '40px 0'}}>
        <InputWithBtn addNewItem={addNewTodoList}/>
      </Grid>
      <Grid container spacing={8}>
        {todoLists.map(tl => {
          return (
            <Grid key={tl.id} item>
              <Paper elevation={8} sx={{p: '20px', minWidth: '310px'}}>
                <TodoLists todoLists={tl}/>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  );
};
