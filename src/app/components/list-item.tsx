import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {todoListType} from "~/app/(home)/page";

interface Props {
  isComplete: boolean
  onClick?: () => void
  item: todoListType
  setItem?:  React.Dispatch<React.SetStateAction<todoListType | undefined>>
}

// 하나의 리스트 아이템을 표시합니다 리스트와 성새 패아자에서 사용됩니다
const ListItem = ({onClick, isComplete, item, setItem}:Props) => {
  const {name, id} = item
  const onChangeInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem && setItem({...item, name: e.currentTarget.value})
  }
  return (
    <div className={`${isComplete && 'bg-violet-100'} ${!onClick && 'justify-center'} rounded-[24px] w-full h-[46px] border-2 py-1 px-2 flex items-center gap-x-3`}>
      <button onClick={onClick} disabled={!onClick}>
        <Image src={`/images/${isComplete ? 'Frame' : 'Default'}.svg`} width={24} height={24} alt={'check box'}/>
      </button>
      {onClick ? (
          <Link href={`/items/${id}`} className={`$w-full text-left`}  >
            <span className={`${isComplete ? 'line-through' : ''}`}>
              {name}
            </span>
          </Link>) :
        (
          <input type={'text'} className={`text-center underline bg-transparent outline-none border-none cursor-pointer`} onChange={onChangeInputName} value={name} />
        )}

    </div>
  );
};
export default ListItem;
