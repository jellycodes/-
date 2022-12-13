import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import curBoardAtom from '../atoms/curBoardAtom'
import { call } from '../../service/ApiService';

const BoardDetail = () => {
    // 조회수 / 닉네임 / 작성일자 / 카테고리
    const [postId, setPostId] = useState("1")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [viewCount, setViewCount] = useState("") // 조회수
    const [nickName, setNickName] = useState("") // 닉네임
    const [createdDate, setCreatedDate] = useState("") // 작성일자
    // const [category, setCategory] = useState("") // 카테고리 --> 일단 공백
    const [curBoard, setCurBoard] = useAtom(curBoardAtom);

    // const [commentId, setCommentId] = useState("") // 댓글 고유 번호
    // const [postSeq, setPostSeq] = useState("") // 게시글 번호
    const [commentContent, setCommentContent] = useState("")

    const writeContent = (event) => {
        setCommentContent(event.target.value)
    } // 댓글 내용

    const req = {
        content: content
    }

    const handleCreate = () => {
        call("/comment", "POST", req)
            .then((res) => {
                console.log(res);
            })
    } // 댓글 작성함수

    const handleDetail = () => {
        const data = {
            postId,
            title,
            content,
            viewCount,
            nickName,
            createdDate,
            // category: 'category' // 일단 대기
        }
        console.log(data);
        console.log(curBoard);
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        };

        fetch('http://localhost:3040/post/selectPost', options)
            .then(response => response.json())
            // .then(data => console.log(data))
            .catch(error => console.error('실패', error));
        console.log("handleDetail clicked button")
    }


    useEffect(() => {
        fetch(`http://localhost:3040/post/selectPost/${curBoard}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setPostId(response.postId)
                setTitle(response.title)
                setContent(response.content)
                setViewCount(response.viewCount)
                setNickName(response.nickName)
                setCreatedDate(response.createdDate)
                // setCategory(response.category)
            })
            .catch(error => console.error(error))
    }, [])

    return (
        <>
            <form>
                <div className='max-w-2xl px-6 py-10 m-auto bg-white rounded-md'>
                    <div className="mb-6 text-2xl font-bold text-left text-gray-500 border-4">
                        <Link href="/board-category/BoardList" className='text-gray-500'>
                            목록으로
                        </Link>
                    </div>
                    <div className="mb-6 text-2xl font-bold text-left text-gray-500 border-4">잡담</div>
                    <div>
                        <div className="mb-10 text-2xl font-bold text-center text-gray-500 border-4">
                            제목
                            <input type="text" readOnly value={title} onChange={(event) => setTitle(event.target.value)} className="px-30 py-4 text-sm w-full text-left text-gray-900 border-2" />
                        </div>
                    </div>
                    <div className='text-amber-700 font-semibold border'>
                        작성일자
                        <input readOnly value={createdDate} onChange={(event) => setCreatedDate(event.target.value)} className="px-2 py-4 text-sm font-light text-center text-gray-900" />
                        조회수
                        <input readOnly value={viewCount} onChange={(event) => setViewCount(event.target.value)} className="px-0 py-4 text-sm font-light text-center text-gray-900" />
                        닉네임
                        <input readOnly value={nickName} onChange={(event) => setNickName(event.target.value)} className="px-2 py-4 text-sm font-light text-center text-gray-900" />
                    </div>
                    <div>
                        <div className="items-center w-full h-[400px] text-gray-600 bg-gray-100 rounded-md resize-none mb-9 text-center">
                            내용
                            <textarea type="text" name="content" readOnly value={content} onChange={event => setContent(event.target.value)} className="items-center w-full h-[400px] text-gray-600 bg-gray-100 rounded-md resize-none mb-9 text-center" />
                        </div>
                    </div>
                    <div className="mb-6">
                        <input name="message" placeholder="댓글입력" onChange={writeContent} className="resize-none focus:outline-none  w-full rounded-lg p-2 text-[20px] bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400" />
                        <div className="flex justify-between mt-2">
                            <Link href='/board-category/BoardDetail'>
                                <button type="submit" onClick={handleCreate} className="float-right flex items-center py-2 px-4 rounded-md text-sm bg-blue-600 text-white shadow-lg">Send
                                    <svg className="ml-1" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <Link href='/board-category/ModifyBoard'>
                        <button type='modify' onClick={handleDetail} className='px-5 py-2 mx-3 font-bold border-2 rounded-lg text-neutral-900 hover:bg-neutral-200 '>수정</button>
                    </Link>
                </div>
            </form>
        </>
    )
}

export default BoardDetail