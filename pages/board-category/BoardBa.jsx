// import React, { useEffect, useState } from 'react'
// import { useAtom } from 'jotai'
// import Link from 'next/link'
// import curBoardAtom from '../atoms/curBoardAtom'

// const BoardBa = () => {

//     const [id, setId] = useState("")
//     const [title, setTitle] = useState("")
//     const [body, setBody] = useState("")
//     const [curBoard, _] = useAtom(curBoardAtom);

//     const handleModify = () => {
//         const data = {
//             id,
//             title,
//             body,
//         }
//         console.log(data);
//         console.log(curBoard);
//         const options = {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data),
//         };

//         fetch(`https://jsonplaceholder.typicode.com/posts/${curBoard}`, options)
//             .then(response => response.json())
//             // .then(data => console.log(data))
//             .catch(error => console.error('실패', error));
//         console.log("handleModify clicked button")
//     }

//     useEffect(() => {
//         fetch(`https://jsonplaceholder.typicode.com/posts/${curBoard}`)
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data);
//                 setId(data.id);
//                 setTitle(data.title);
//                 setBody(data.body);
//             })
//             .catch(error => console.error(error))
//     }, [])

//     return (


//         <div>
//             <div>
//                 <div>

//                     <input type="text" readOnly value={id} onChange={(event) => setId(event.target.value)} className="px-6 py-4 text-sm font-medium text-left text-gray-900 border-2" />
//                     <input type="text" value={title} placeholder="제목을 입력하세요" onChange={(event) => setTitle(event.target.value)} className="px-6 py-4 text-sm font-medium text-left text-gray-900 border-2" />
//                     <input type="text" value={body} placeholder="내용을 입력하세요" onChange={event => setBody(event.target.value)} className="px-6 py-4 text-sm font-medium text-left text-gray-900 border-2" />

//                 </div>
//             </div>
//             <Link href='/BoardList'>
//                 <button type='modify' onClick={handleModify} className='px-5 py-2 mx-3 font-bold border-2 rounded-lg text-neutral-900 hover:bg-neutral-200 '>수정</button>
//             </Link>
//         </div>
//     )
// }

// export default BoardBa