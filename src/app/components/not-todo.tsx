import React from 'react';
import Image from "next/image";

interface Props {
  type: 'todo' | 'done'
}
const NotTodo = ({type}: Props) => {
  const image = type === 'todo' ? 'TodoLarge' : 'DoneLarge'
  const text = type === 'todo' ? '할 일이 없어요' : '한 일이 없어요'
  return (
    <div className='flex flex-col items-center justify-center'>
      <Image
        src={`/images/${image}.svg`}
        width={500}
        height={40}
        alt="logo size large"
      />
      <span className='text-slate-400'>{text}</span>
    </div>
  );
};

export default NotTodo;
