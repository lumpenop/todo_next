

import React from 'react';
import RoundedShadow from "~/app/components/rounded-shadow";



interface Props {
  bgColor: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  text: string
}


const Search = ({bgColor, onChange, text}: Props) => {
  return (
    <RoundedShadow bgColor={bgColor}>
      <input type="text" value={text} onChange={onChange} className={`w-full  border-none outline-0 ${bgColor}`} placeholder='할 일을 입력해주세요' />
    </RoundedShadow>
  );
};

export default Search;
