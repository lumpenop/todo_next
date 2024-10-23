'use client'
import React from 'react';
import Image from "next/image";


interface Props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  imgSrc: string
}
const InputLabel = ({handleChange, imgSrc}:Props) => {
  let className
  let imgCss = className = 'border-2 border-slate-900 bg-slate-500'
  let notImgCss = className = 'bg-slate-300'
  return (
    <>
      <label htmlFor="input-file"
             className={`rounded-[30px] w-[50px] h-[50px] ${imgSrc ? imgCss : notImgCss} flex items-center justify-center absolute right-3 bottom-3 cursor-pointer`}>
        {imgSrc ? <Image src={'/images/edit.svg'} width={25} height={25} priority={false} alt='plus' /> : <Image src={'/images/plus.svg'} width={25} height={25} priority={false} alt='plus'/>}
      </label>
      <input className='hidden' type="file" accept="image/*" onChange={handleChange} id='input-file' />
    </>
  );
};

export default InputLabel;
