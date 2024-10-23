'use client'
import SearchSection from "~/app/(home)/_search/search-section";
import ListSection from "~/app/(home)/_list/list-section";
import {useEffect, useState} from "react";
import Image from "next/image";


export type todoListType = {
  isCompleted: boolean,
  name: string,
  id: number,
  memo: string,
  imageUrl: string
 }


const Home = () => {
    // ide 에서 className='' 규칙을 사용하여 자동 완성 기능을 사용하기 위한..
  const [allList, setAllList] = useState<todoListType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const getItems = async () => {
    const response = await fetch(`/url/${process.env.NEXT_PUBLIC_TENANT_ID}/items`)
    return response.json()
  }
  useEffect(() => {
    getItems().then(res => {
      setAllList(res)
      setIsLoading(false)
    }).catch(e => {
      console.log(e)
    })
  }, []);






  const addOdItem = (item: todoListType) => {
    setAllList([...allList, {...item}])
  }

  return (
          <div className='w-full flex flex-col justify-center items-center'>
            <SearchSection addOdItem={addOdItem} />
            <ListSection allList={allList} setAllList={setAllList} isLoading={isLoading} />
          </div>
  )
}
export default Home
