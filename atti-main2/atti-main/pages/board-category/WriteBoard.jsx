import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import curBoardAtom from '../atoms/curBoardAtom';
import { useAtom } from 'jotai';
import axios from 'axios';
import { call } from '../../service/ApiService';
import authAtom from '../../public/stores/authAtom';
import { useRouter } from 'next/router'



const WriteBoard = () => {
  const [postId, setPostId] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [curBoard, setCurBoard] = useAtom(curBoardAtom);
  const [auth, setAuth] = useAtom(authAtom);
  const router = useRouter()

  const writeTitle =(event) =>{
    setTitle(event.target.value)
  }

  const writeContent =(event) =>{
    setContent(event.target.value)
  }

  const req = {
          title : title,
          content : content 
        }
 
  const handleCreate = () => {
     call("/post/writePost", "POST", req)
    .then((res) => {
    console.log(res);
  
    router.push("/Board")
  }) 
    .catch((err) =>{
      console.log(err);
    }
    ) 
  }


  return (
    <div className='m-auto'>
      <table className='mx-auto my-20 border-2 border-separate rounded-lg shadow-2xl border-spacing-6 border-neutral-300'>
        <thead>
          <tr className="px-6 py-4 text-sm font-medium text-left text-gray-900 border-2"><th className='p-3 text-lg text-center text-neutral-800'>Title</th>
            <input type="text" name = "title"  placeholder="고민을 한 마디로 알려주세요" onChange={writeTitle} className="px-6 py-4 text-sm font-medium text-left text-gray-900 border-2" /></tr>
          <tr className="py-4 text-sm font-medium text-left text-gray-900 border-2px-6"><th className='p-3 text-lg text-center text-neutral-800'>Content</th>
            <textarea type="text" name = "content"  placeholder="당신의 고민을 적어보세요" onChange={writeContent} className="px-6 py-4 text-sm font-medium text-left text-gray-900 border-2" /></tr>

        <button type='create' onClick={handleCreate} className='float-right px-5 py-2 font-bold border-2 rounded-lg text-neutral-900 hover:bg-neutral-200'>Write</button>
     
        </thead>
      </table>
    </div>
  )
}
export default WriteBoard