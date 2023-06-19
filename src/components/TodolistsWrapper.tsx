import React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolists} from "./Todolists";
import {createTodoListTC, TodolistDomainType} from "../redusers/todolists-reducer";
import {useAppDispatch, useAppSelector} from "../store/store";
import {InputWithBtn} from "./InputWithBtn";


export const TodolistsWrapper = () => {

  const todoLists = useAppSelector<TodolistDomainType[]>(state => state.todoLists)
  const dispatch = useAppDispatch()


  const addNewTodoList = React.useCallback((title: string) => {
    dispatch(createTodoListTC(title))
  }, [dispatch])

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
                <Todolists todoLists={tl}/>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  );
};
