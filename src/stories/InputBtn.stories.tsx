import type {Meta, StoryObj} from '@storybook/react';
import {InputWithBtn} from "../components/InputWithBtn";
import {action} from '@storybook/addon-actions'
import {IconButton, TextField} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React from "react";


const meta: Meta<typeof InputWithBtn> = {
  title: 'Todolist/InputBtn',
  component: InputWithBtn,
  tags: ['autodocs'],
  argTypes: {
    addNewItem: {
      description: 'Button clicked inside form',
      action: 'clicked'
    }
  },
};

export default meta
type Story = StoryObj<typeof InputWithBtn>;

export const PrimaryInput: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    addNewItem: action('test ')
  },
};

export const ErrorInput = () => {

  const [inputTitle, setInputTitle] = React.useState('')
  const [error, setError] = React.useState(false)

  return (
    <div className={'inputWrapper'}>
      <TextField
        variant={'outlined'}
        label={'title is required'}
        value={inputTitle}
        onChange={() => {
        }}
        onKeyDown={() => {
        }}
        onBlur={() => setError(true)}
        error={true}
        size={'small'}
      />

      <IconButton
        size={'small'}
        onClick={() => {
        }}>
        <AddCircleIcon color={'secondary'}/>
      </IconButton>
    </div>
  )

};