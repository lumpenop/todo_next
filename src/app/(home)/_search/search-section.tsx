'use client'
import React, {useEffect, useState} from 'react';
import Search from "~/app/(home)/_search/search";
import AddButton from "~/app/(home)/_search/addButton";
import {todoListType} from "~/app/(home)/page";


interface Props {
  addOdItem: (item: todoListType) => void
}
const SearchSection = ({addOdItem}: Props) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false)
  const [text, setText] = useState<string>('')

  useEffect(() => {
    if (text === '') setIsButtonEnabled(false)
    else setIsButtonEnabled(true)
  }, [text]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };


  let className
  let searchBgColor = className = 'bg-slate-100'

  const postTodo = async () => {
    const response = await fetch(`/url/${process.env.NEXT_PUBLIC_TENANT_ID}/items`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({name: text})
      }
    )
    return response.json()
  }
  const addButtonClick = async () => {
    postTodo().then(res => {
      const item: todoListType = res
      addOdItem(item)
    }).catch(e => console.log(e))
  }


  return (
    <section className='w-full flex items-center justify-between  gap-4'>
      <Search bgColor={searchBgColor} onChange={onChange} text={text}/>
      <AddButton isButtonEnabled={isButtonEnabled} addButtonClick={() => {addButtonClick().then(res => console.log(res))}}/>
    </section>
  );
};

export default SearchSection;
