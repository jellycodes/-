import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import curBoardAtom from '../atoms/curBoardAtom'
import Router, { useRouter } from 'next/router'
const ModifyBoard = () => {

    const [postId, setPostId] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [curBoard, setCurBoard] = useAtom(curBoardAtom);
    const router = useRouter();

    const handleModify = () => {

        if(title === "" || content === ""){
            alert("제목 및 내용을 입력해주세요.")
             
        }else{

        let headers = new Headers({
            "Content-Type": "application/json",
        })

        const accessToken = sessionStorage.getItem("ACCESS_TOKEN")
        if(accessToken && accessToken !==null){
            headers.append("Authorization", "Bearer " + accessToken);
        }
        
        const req = {
            postId : curBoard,
            title: title,
            content: content,
        }
        console.log(req);
        console.log("글 수정을 위한 엑세스 토큰 확인: " +accessToken );
        const options = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(req)
        };

        fetch('http://localhost:3040/post', options)
            .then(response => {response.json();
                if (response.ok) { alert("수정이 완료되었습니다.") } else { alert("해당 요청은 작성자만 가능합니다.")
        }})
            .catch(error => console.error('해당 요청은 작성자만 가능합니다.', error));
        console.log("handleModify clicked button")}
    }

    const handleDelete = () => {

        
        
        let headers = new Headers({
            "Content-Type": "application/json",
        })

        const accessToken = sessionStorage.getItem("ACCESS_TOKEN")
        if(accessToken && accessToken !==null){
            headers.append("Authorization", "Bearer " + accessToken);
        }

        const req = {
            postId: curBoard,
            title,
            content
        }

        console.log(req);
        console.log(curBoard);
        const options = {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify(req)
        };

        fetch(`http://localhost:3040/post`, options)
            .then(response => {
                if (response.ok) { alert("삭제가 완료되었습니다.") } else { alert("해당 요청은 작성자만 가능합니다.") }
            })
            .catch(response => response.resMessage);
        console.log("handledelete clicked button")
    }

    useEffect(() => {
        fetch(`http://localhost:3040/post/selectPost/${curBoard}`)
            .then(response => response.json())
            .then(data => {
                console.log("현재 게시글 번호:" + curBoard);
                setPostId(data.postId);
                setTitle(data.title);
                setContent(data.content);
            })
            .catch(error => console.error(error))
    }, [])


    return (
        <>
            <div className='container flex justify-center mx-auto'>
                <div className="flex flex-col">
                    <div className="w-full">
                        <div className="overflow-hidden">
                            <table className='mx-auto my-20 border-2 border-separate rounded-lg shadow-2xl border-spacing-6 border-neutral-300'>
                                <thead>
                                    <tr className="px-6 py-2 text-xs text-gray-900">
                                        <input type="text" readOnly value={curBoard} className="px-6 py-4 text-sm font-medium text-left text-gray-900 border-2" />
                                    </tr>
                                    <tr className="px-40 text-xs text-gray-900">
                                        <input type="text" value={title} placeholder="제목을 입력하세요" onChange={(event) => setTitle(event.target.value)} className="px-6 py-4 text-sm font-medium text-left text-gray-900 border-2" />
                                    </tr>
                                    <tr className="px-6 py-4 text-sm font-medium text-left text-gray-900 border-2">
                                        <textarea type="text" value={content} placeholder="내용을 입력하세요" onChange={event => setContent(event.target.value)} className="px-6 py-4 text-sm font-medium text-left text-gray-900 border-2" />
                                    </tr>
                                </thead>
                            </table>
                            <Link href='/Board'>
                                <button type='modify' onClick={handleModify} className='px-5 py-2 mx-3 font-bold border-2 rounded-lg text-neutral-900 hover:bg-neutral-200 '>수정</button>
                            </Link>
                            <Link href='/Board'>
                                <button type='delete' onClick={handleDelete} className='px-5 py-2 m-3 font-bold border-2 rounded-lg text-neutral-900 hover:bg-neutral-200'>삭제</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModifyBoard