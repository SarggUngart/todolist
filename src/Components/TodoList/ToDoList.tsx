import React, {FC} from 'react';
import {FilteredValueType} from "../../App";
import styles from "./ToDoList.module.css"
 import AddItemForm from "../AddItemForm/AddItemForm";
import EditableTitle from "../../EditableTitle/EditableTitle";
import {IconButton} from "@material-ui/core";
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";


export type TasksType = {
  id: string,
  title: string,
  isDone: boolean
}


type ToDoListPropsType = {
  todolistId: string
  title: string
  tasks: TasksType[]
  removeTask: (todolistId: string, id: string) => void
  filteredTasks: (todolistId: string, value: FilteredValueType) => void
  addTask: (todolistId: string, title: string) => void
  changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  filter: FilteredValueType
  removeTodoList: (todolistId: string) => void
  updateTaskTitle: (todolistId: string, id: string, newTitle: string) => void
  updateTodoListTitle: (todolistId: string, newTitle: string) => void

}

export const ToDoList: FC<ToDoListPropsType> = ({
                                                  todolistId,
                                                  title,
                                                  tasks,
                                                  removeTask,
                                                  filteredTasks,
                                                  addTask,
                                                  changeStatus,
                                                  filter,
                                                  removeTodoList,
                                                  updateTaskTitle,
                                                  updateTodoListTitle
                                                }) => {

  const updateTodolistHandler = (newTitle: string) => {
    updateTodoListTitle(todolistId, newTitle)
  }

  const removeTodoListHandler = () => {
    removeTodoList(todolistId)
  }

  const AddItemFormHandler = (newTitle: string) => {
    addTask(todolistId, newTitle)
  }

  const onChangeCheckBoxHandler = (todolistId: string, taskId: string, isDone: boolean) => {
    changeStatus(todolistId, taskId, isDone)
  }

  const updateTaskHandler = (id: string, newTitle: string) => {
    updateTaskTitle(todolistId, id, newTitle)
  }

  const removeTaskHandler = (todolistId: string, id: string) => {
    removeTask(todolistId, id)
  }

  const filteredTasksHandler = (todolistId: string, value: FilteredValueType) => {
    filteredTasks(todolistId, value)
  }


  return (
    <div>
      <div className={'todolistHeader'}>
        <h3><EditableTitle callBack={updateTodolistHandler} title={title}/>
        </h3>

        <IconButton
          style={{color: '#1e85ff'}}
          onClick={removeTodoListHandler}
          aria-label="delete">
          <Delete/>
        </IconButton>

      </div>

      <AddItemForm callBack={AddItemFormHandler}/>

      <ul>
        {tasks.map((el) => {

            return (
              <li key={el.id}
                  className={el.isDone ? styles.doneTask : ''}>
                {/*<CheckBox isDone={el.isDone} callBack={(isDone) => onChangeCheckBoxHandler(todolistId, el.id, isDone)}/>*/}
                <Checkbox
                  onChange={(e) => onChangeCheckBoxHandler(todolistId, el.id, e.currentTarget.checked)}
                  checked={el.isDone}
                  size={'small'}
                />
                <EditableTitle
                  callBack={(newTitle: string) => updateTaskHandler(el.id, newTitle)}
                  title={el.title}

                />
                <IconButton
                  style={{marginLeft: 'auto', padding: '3px 12px 3px 3px'}}
                  size={'small'}
                  onClick={() => removeTaskHandler(todolistId, el.id)}
                  aria-label="delete">
                  <Delete/>
                </IconButton>
              </li>
            )
          }
        )}
      </ul>

      <div style={{textAlign: 'center'}}>
        <Button variant={filter === 'All' ? 'contained' : 'text'}
                color="primary"
                onClick={() => filteredTasksHandler(todolistId, 'All')}
                size={'small'}>
          All
        </Button>

        <Button variant={filter === 'Active' ? 'contained' : 'text'}
                color="primary"
                onClick={() => filteredTasksHandler(todolistId, 'Active')}
                size={'small'}>
          Active
        </Button>
        <Button variant={filter === 'Completed' ? 'contained' : 'text'}
                color="primary"
                onClick={() => filteredTasksHandler(todolistId, 'Completed')}
                size={'small'}>
          Completed
        </Button>

      </div>
    </div>

  );
};
