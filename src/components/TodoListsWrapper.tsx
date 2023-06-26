import React, {useState} from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {createTodoListTC, getTodoListsTC, reorderTodoListTC, TodolistDomainType} from "../redusers/todolists-reducer";
import {useAppDispatch, useAppSelector} from "../store/store";
import {InputWithBtn} from "./InputWithBtn";
import {Navigate} from "react-router-dom";
import {TodoLists} from "./Todolists";


export const TodoListsWrapper = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const todoLists = useAppSelector<TodolistDomainType[]>(state => state.todoLists)

  const dispatch = useAppDispatch()

  const [currentTlId, setCurrentTlId] = useState('')

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

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, todolistID: string) => {
    setCurrentTlId(todolistID)
  }

  const dragDropHandler = (e: React.DragEvent<HTMLDivElement>, putAfterID: string) => {
    dispatch(reorderTodoListTC(currentTlId, putAfterID))
    setCurrentTlId('')
  }

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {

  }

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

  }

  console.log(currentTlId)

  return (
    <>
      <h4>Title of the new list</h4>
      <Grid container style={{margin: '-15px 0 40px 0'}}>
        <InputWithBtn addNewItem={addNewTodoList}/>
      </Grid>
      <Grid container spacing={8}>
        {todoLists.map(tl => {
          return (
            <Grid key={tl.id} item
                  onDragLeave={(e) => dragEndHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDragOver={(e) => dragOverHandler(e)}>
              <Paper
                draggable={true}
                onDragStart={(e) => dragStartHandler(e, tl.id)}
                onDrop={(e) => dragDropHandler(e, tl.id)}
                elevation={8} sx={{
                p: '20px', minWidth: '310px'
              }}>
                <TodoLists todoLists={tl}/>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  );
}

