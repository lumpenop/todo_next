'use client'
import React, {useEffect, useRef, useState} from 'react';
import {todoListType} from "~/app/(home)/page";
import ListItem from "~/app/components/list-item";
import Image from "next/image";
import InputLabel from "~/app/components/input-label";
import Button from "~/app/components/button";

import { useRouter } from 'next/navigation'


// 아이템의 상세 페이지로 수정과 삭제가 가능합니다
const Items = ({params: {itemId}}: {params: {itemId: string}}) => {
  const prevItem = useRef<todoListType>()
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
  const [item, setItem] = useState<todoListType>()
  const [imageSrc, setImageSrc] = useState<string>('');
  const router = useRouter()

  const getItem = async () => {
    const response = await fetch(`/url/${process.env.NEXT_PUBLIC_TENANT_ID}/items/${itemId}`)
    return response.json()
  }

  const uploadImage = async (formData: FormData): Promise<{url: string}> => {
    const response = await fetch(`/url/${process.env.NEXT_PUBLIC_TENANT_ID}/images/upload`, {
      method: 'POST',
      body: formData
    })
    return response.json()
  }

  // 수정하기 버튼이 데이터가 수정되었을 때만 활성화 되도록 해줍니다
  useEffect(() => {
    const {current} = prevItem
    if (!item || !current) return
    const {memo, name, imageUrl} = item
    const isSame = memo === current.memo && name === current.name && imageUrl === current.imageUrl
    if (isSame) setIsButtonDisabled(true)
    else setIsButtonDisabled(false)
  }, [item])


 // 처음 진입 시 데이터 페칭을 합니다
  useEffect(() => {
    getItem().then(res => {
      setItem(res)
      prevItem.current = res
    }).catch(e => console.log(e))
  }, []);

  // 사진이 업데이트 되었을 때 기존 item 에서도 수정합니다



 // 파일 이름이 영어로만 이루어져있는지 확인합니다
  const checkEnglish = (fileName: string): boolean => {
    const name = fileName.split('.')[0]
    const eng = /^[a-zA-Z]*$/;
    return eng.test(name)
  }

  // 파일 input 시 체크 후 통과하면 파일을 업로드 합니다
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const maxSize = 5 * 1024 * 1024;
    console.log('checkEnglish', file.name)
    if (!checkEnglish(file.name)) {
      alert('파일 이름은 영어만')
      return
    }
    if (file.size > maxSize) {
      alert('5mb 이내 파일만 가능')
      return
    }

    const formData = new FormData();
    formData.append("image", file);
    uploadImage(formData).then(res => {
      if (item) setItem({...item, imageUrl: res.url})

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setImageSrc(e.target?.result);
        }
      };
    }).catch(e => console.log(e))
  };

  if (!item) return
  const {name, isCompleted, memo, imageUrl} = item

  // 아이템을 수정합니다
  const modifyItem = async () => {
    const response = await fetch(`/url/${process.env.NEXT_PUBLIC_TENANT_ID}/items/${itemId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'PATCH',
      body: JSON.stringify({ name, isCompleted, imageUrl, memo}),
    })
    response.json().then(res => console.log(res))
  }

  // 아이템을 삭제합니다
  const deleteItem = async () => {
    const response = await fetch(`/url/${process.env.NEXT_PUBLIC_TENANT_ID}/items/${itemId}`, {method: 'DELETE'})
    if (response.status === 200) {
      router.push('/')
      response.json().then(res => console.log(res))
    }
  }


  // 상태에 따라 버튼 색상을 변경합니다
  const settingModifyColor = (isButtonEnabled: boolean) => {
    let className
    const modifyTextColor = className = 'text-slate-900'
    let modifyBgColor

    if (isButtonEnabled) {
      modifyBgColor = className = 'bg-lime-300'
    }
    else {
      modifyBgColor = className = 'bg-slate-300'
    }

    return {modifyTextColor, modifyBgColor}
  }
  const {modifyTextColor, modifyBgColor} = settingModifyColor(!isButtonDisabled)

  return (
    <div className={'w-full flex flex-col justify-center'}>
      <div className='w-[100%] flex flex-col'>
        <ListItem isComplete={isCompleted} item={item} setItem={setItem}/>
        <div className='flex tablet:flex-col mobile:flex-col w-full justify-between gap-4 pt-6'>
          <div
            className={`w-[430px] tablet:w-full mobile:w-full h-[350px] border-dashed border-slate-300 ${!imageSrc && 'border-2'} rounded-2xl bg-slate-100 flex items-center justify-center relative overflow-hidden`}>
            {imageUrl? <Image src={imageUrl} layout={"fill"} objectFit={"cover"} alt='img'/> : <Image src={'/images/img.svg'} width={70} height={70} alt='img'/>}
            <InputLabel handleChange={handleChange} imgSrc={imageSrc} />
          </div>
          <div className='relative flex justify-center'>
            <div className='w-[500px] h-[350px]'>
              <Image src={'/images/memo.svg'} layout={"fill"}
                   objectFit={"cover"} priority alt={'memo'} className={'relative top-0'} />
            </div>
            <div className='w-full h-[350px] flex flex-col items-center justify-center gap-3 absolute top-0'>
              <h1 className='text-amber-800 font-bold'>Memo</h1>
              <textarea className='w-[90%] h-[250px] resize-none bg-transparent outline-none border-none' name="memo" id="memo"  cols={30} rows={10} value={memo} onChange={(e:  React.ChangeEvent<HTMLTextAreaElement>) => setItem({...item, memo: e.currentTarget.value})} />
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-3 justify-end tablet:justify-center mobile:justify-center pt-4'>
        <Button bgColor={modifyBgColor} textColor={modifyTextColor} onClick={() => {
          modifyItem().then().catch()
          getItem().then(res => setItem(res)).catch()
          setIsButtonDisabled(true)
        }} isButtonDisabled={isButtonDisabled}>
          <Image src='/images/check.svg' width={16} height={16} alt={'plus images'}/>
          수정완료
        </Button>
        <Button bgColor={'bg-rose-500'} textColor={'text-slate-100'} onClick={deleteItem} >
          <Image src='/images/X.svg' width={16} height={16} alt={'plus images'}/>
          삭제하기
        </Button>
      </div>
    </div>
  );
};

export default Items;
