import React from 'react';
import Image from "next/image";
import Link from "next/link";

const Gnb = () => {
  return (
    <nav className='w-full h-[60px] border-b-[1px] border-slate-200 flex items-center justify-center'>
      <div className='w-[80%]'>
        <Link href={'/'}>
          <Image
            className='mobile:hidden'
            src={`/images/Large.svg`}
            width={151}
            height={40}
            alt="logo size large"
          />
          <Image
            className='pc:hidden tablet:hidden'
            src={`/images/Small.svg`}
            width={80}
            height={30}
            alt="logo size large"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Gnb;
