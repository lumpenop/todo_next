import React from 'react';
import TodoState from "~/app/(home)/_list/todo-state";

interface Props {
  todoColor: string
  doneColor: string
}
const StateSection = ({todoColor, doneColor}: Props) => {
  return (
    <div className='grid grid-cols-2 gap-10'>
      <div className='w-[500px]'>
        <TodoState text={'TO DO'} colors={todoColor}/>
      </div>
      <div className='w-[500px]'>
        <TodoState text={'DONE'} colors={doneColor}/>
      </div>
    </div>
  );
};

export default StateSection;
