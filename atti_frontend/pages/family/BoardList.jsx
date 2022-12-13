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
  let [postNum, setPostNum] = useState(1)



  const checkUser = (e) => {
    if (auth.token === null) {
      e.preventDefault();
      alert("로그인 후 사용 가능합니다.");
    }
  }

  const viewCountIncrease = async (postId) => {
    await axios.put(`http://localhost:3040/post/${postId}`)
      .then((res) => {
        console.log("-----------------------------------------");
        console.log(res);
        console.log("-----------------------------------------");
      })
      .catch(err => {
        console.log(postId);
      })
  }


  useEffect(() => {
    axios
      // .get('https://jsonplaceholder.typicode.com/posts')
      .get('http://localhost:3040/post/postList/main')
      .then((response) => {
        setBoards(response.data)
        console.log(response);
        console.log("보드 사이즈 " + response.data.length);
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
              <th className="px-4 py-2 bg-[#F8F8F8] text-center border">No.</th>
              <th className="px-4 py-2 bg-[#F8F8F8] text-center border">제목</th>
              <th className="px-4 py-2 bg-[#F8F8F8] text-center border">닉네임</th>
              <th className="px-4 py-2 bg-[#F8F8F8] text-center border">작성일</th>
              <th className="px-4 py-2 bg-[#F8F8F8] text-center border">조회수</th>
            </tr>
          </thead>
          <tbody className="text-sm font-normal text-gray-700">
            {boards && boards.slice(offset, offset + limit).map(board => (
              <tr key={board.postId} className="hover:bg-gray-100 border-b border-gray-200 py-10" >


                <td className="px-4 py-2 text-center border">{postNum++}</td>

                <td className="px-4 py-2 text-left border">
                  <Link href="/family/BoardDetail" onClick={() => {
                    SetCurBoard(board.postId);
                    viewCountIncrease(board.postId)
                  }} className="text-gray-700 border">{board.title}
                  </Link>
                </td>

                <td className="px-4 py-2 text-center border">{board.nickName}</td>

                <td className="px-2 py-2 text-center border">{board.createdDate}</td>

                <td className="px-1 py-2 text-center border">{board.viewCount}</td>

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
        <Link href="/family/WriteBoard" onClick={checkUser} className="float-right px-5 py-2 font-bold border-2 rounded-lg text-neutral-900 hover:bg-neutral-200">글쓰기</Link>
      </div>
    </>
  )
}
export default BoardList