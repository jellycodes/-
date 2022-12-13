import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import curBoardAtom from '../atoms/curBoardAtom';
import { useAtom } from 'jotai';
import axios from 'axios';
import { call } from '../../service/ApiService';
import authAtom from '../../public/stores/authAtom';



const WriteBoard = () => {
  const [postId, setPostId] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [curBoard, setCurBoard] = useAtom(curBoardAtom);
  const [auth, setAuth] = useAtom(authAtom);
  const category = "연애"

  const writeTitle = (event) => {
    setTitle(event.target.value)
  }

  const writeContent = (event) => {
    setContent(event.target.value)
  }

  const req = {
    title: title,
    content: content
  }

  const handleCreate = () => {
    call("/post/writePost", "POST", req)
      .then((res) => {
        console.log(res);
      })
  }


  return (
    <>
      <form>
        <div className='max-w-2xl px-6 py-10 m-auto bg-white rounded-md'>
          <div className="mb-6 text-2xl font-bold text-left text-gray-500 border-4">목록으로</div>
          <div className="mb-6 text-2xl font-bold text-left text-gray-500 border-4">{category}</div>
          <div>
            <div className="mb-10 text-2xl font-bold text-center text-gray-500 border-4">
              제목
              <input type="text" name="title" value={title} placeholder="고민을 한 마디로 알려주세요" onChange={writeTitle} className="px-30 py-4 text-sm w-full text-left text-gray-900 border-2" />
            </div>
          </div>
          <div>
            <div className="items-center w-full h-[400px] text-gray-600 bg-gray-100 rounded-md resize-none mb-9 text-center">
              내용
              <textarea type="text" name="content" value={content} placeholder="당신의 고민을 적어보세요" onChange={writeContent} className="items-center w-full h-[400px] text-gray-600 bg-gray-100 rounded-md resize-none mb-9 text-center" />
              </div>
          </div>
          <Link href='/love/BoardList'>
            <button type='create' onClick={handleCreate} className='float-right px-5 py-2 font-bold border-2 rounded-lg border-sky-500 text-blue-500 hover:bg-neutral-200'>작성완료</button>
          </Link>

        </div>
      </form>
    </>
  )
}
export default WriteBoard


