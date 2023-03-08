import React from 'react';
import {Button} from "./Button";


export const Input:React.FC = () => {
  return (
    <div>
      <input/>
      <Button btnName={'+'} btnOnclick={() => {
      }}/>
    </div>
  );
};
