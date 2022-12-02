import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import List from './List';


const BoardList = () => {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      // http://localhost:8090/boards
      .then((response) => {
        setBoards(response.data)
      }).catch(error => {
        console.error(error)
      })

      console.log(boards);
  }, []);

  return (
    <table className='mx-auto my-20 border-2 border-separate rounded-lg shadow-2xl border-spacing-6 border-neutral-300'>
      <List boards = {boards}/>
      <thead>
        {/* <div className='flex space-x-32'>
          <div className='p-3 text-2xl font-bold border-2 text-neutral-800 rounded-xl'>번호</div>
          <div className='p-3 text-2xl font-bold border-2 text-neutral-800 rounded-xl'>제목</div>
          <div className='p-3 text-2xl font-bold border-2 text-neutral-800 rounded-xl'>내용</div>
        </div> */}
      </thead>
      <Link href="/board-category/WriteBoard" className="float-right px-5 py-2 font-bold border-2 rounded-lg text-neutral-900 hover:bg-neutral-200">글쓰기</Link>
    </table>
  )
}
export default BoardList