import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import List from './List';


const BoardList = () => {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setBoards(response.data)
      }).catch(error => {
        console.error(error)
      })

    console.log(boards);
  }, []);

  return (
    <>
      <div className='grid place-items-center text-xl text-white'>
        <table className='table-auto m-5 border-neutral-300'>
          <List boards={boards} />
          <thead>
            <tr className='flex space-x-32'>
              <th className='px-6 py-3 text-xl text-gray-500'>번호</th>
              <th className='px-40 py-3 text-xl text-gray-500 '>제목</th>
              <th className='px-6 py-2 text-xl text-gray-500'>내용</th>
            </tr>
          </thead>
          <Link href="/board-category/WriteBoard" className="float-right px-5 py-2 font-bold border-2 rounded-lg text-neutral-900 hover:bg-neutral-200">글쓰기</Link>
        </table>
      </div>
    </>
  )
}
export default BoardList