import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import TodoList from "~/app/(home)/_list/todo-list";
import StateSection from "~/app/(home)/_list/state-section";
import {todoListType} from "~/app/(home)/page";


interface Props {
  allList: todoListType[]
  setAllList:  Dispatch<SetStateAction<todoListType[]>>
  isLoading: boolean
}

// todo list 의 리스트 항목을 감싸는 컴포넌트로 할 일과 할 일을 분리합니다

const ListSection = ({allList, isLoading}:Props) => {
  const [todoList, setTodoList] = useState<todoListType[]>([])
  const [doneList, setDoneList] = useState<todoListType[]>([])

  // 할 일과 한 일을 전체 리스트에서 분리합니다
  useEffect(() => {
    const todos = allList.filter(todo => !todo.isCompleted)
    const dones  = allList.filter(todo => todo.isCompleted)
    setTodoList(todos)
    setDoneList(dones)
  }, [allList]);


  return (
    <section className='grid gap-y-4 mt-10'>
      <TodoList doList={todoList} doneList={doneList} setDoList={setTodoList} setDoneList={setDoneList} isLoading={isLoading} />
    </section>
  );
};

export default ListSection;
