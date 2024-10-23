import React from 'react';

interface Props {
  text: 'TO DO' | 'DONE'
  colors: string
}
const TodoState = ({text, colors}: Props) => {
  return (
    <span className={`rounded-[23px] w-[90px] h-[32px] font-bold ${colors} text-16 py-2 px-5`}>
      {text}
    </span>
  );
};

export default TodoState;
