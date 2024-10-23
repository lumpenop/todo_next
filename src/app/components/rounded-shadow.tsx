import React from 'react';
import color from 'tailwindcss/colors'




interface Props {
  bgColor: string
  isAdd?: boolean
  children?: React.ReactNode
}


const RoundedShadow = ({bgColor,isAdd,children}: Props) => {
  return (
    <div className={`w-full inline-flex items-center rounded-[24px] border-[2px] border-stale-900 overflow-hidden shadow-[3px_3px_#000] px-6 ${isAdd && 'mobile:p-4'} py-3 ${bgColor}`}>
      {children}
    </div>
  );
};

export default RoundedShadow;
