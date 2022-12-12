import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import curBoardAtom from '../atoms/curBoardAtom';
import { useAtom } from 'jotai';
import BoardPaging from './BoardPaging';
import authAtom from '../../public/stores/authAtom';


const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [_, SetCurBoard] = useAtom(curBoardAtom);
  const [auth, setAuth] = useAtom(authAtom);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  let [postNum, setPostNum] = useState(0)

  const increasePostNum = () => {
    setPostNum(postNum+1)
  }

  const checkUser = (e) =>{
    if(auth.token === null){
      e.preventDefault();
      alert("로그인 후 사용 가능합니다.");
    }
  }

  useEffect( () => {
   axios
      // .get('https://jsonplaceholder.typicode.com/posts')
      .get('http://localhost:3040/post/postList/main')
      .then((response) => {
        setBoards(response.data)
        console.log(response);
      }).catch(error => {
        console.error(error)
      })

    console.log(boards);
  }, []);

  return (
    <>
    <label >
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="10">10</option>
        </select>
      </label>
      <div className="overflow-x-auto mt-6">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr className="rounded-lg text-sm font-medium text-gray-700 text-left text-[0.9674rem]">
              <th className="px-4 py-2 bg-[#F8F8F8]">번호</th>
              <th className="px-4 py-2 bg-[#F8F8F8] text-center">제목</th>
              <th className="px-4 py-2 bg-[#F8F8F8] text-center">조회수</th>
              <th className="px-4 py-2 bg-[#F8F8F8] text-center">닉네임</th>
              <th className="px-4 py-2 bg-[#F8F8F8] text-center">작성일</th>
            </tr>
          </thead>
          <tbody className="text-sm font-normal text-gray-700">
            {boards && boards.slice(offset, offset + limit).map(board => (
              <tr key= {board.postId} className="hover:bg-gray-100 border-b border-gray-200 py-10" >
            
                <td className="px-4 py-4">{board.postId}</td>

                <td className="px-4 py-4" >{postNum}</td>

                <td className="px-4 py-4 text-center"><Link href="/board-category/BoardDetail" onClick={() => {
                  SetCurBoard(board.postId);
                }} className="text-gray-700">{board.title}</Link></td>

                <td className="px-4 py-4 text-left">{board.content}</td>

                <td className="px-4 py-4 text-left">{board.nickName}</td>

                <td className="px-4 py-4 text-left">{board.createdDate}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
        <BoardPaging
          total={boards.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <Link href="/board-category/WriteBoard" onClick={checkUser} className="float-right px-5 py-2 font-bold border-2 rounded-lg text-neutral-900 hover:bg-neutral-200">글쓰기</Link>
      </div>
    </>
  )
}
export default BoardList