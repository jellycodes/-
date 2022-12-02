import React, { useState } from 'react'
import Link from 'next/link';


const SignIn = () => {
    const [nickName,setnickName] = useState('')
    const [pwd,setPwd] = useState('')


    const ChangenickName = e => {
        setnickName(e.target.value)
    }
    const ChangePwd = e => {
        setPwd(e.target.value)
    }
    const handleSubmit=e=>{
        e.preventDefault()
    }
        //fetch()

    };

  return (
    <>
    <Link href="/auth/Signin">
            <div className='align-middle pt-[300px]'>
            <section className='pt-[40px] flex flex-col items-center'>
                    <form method="POST" action="/auth/Signin" onSubmit={handleSubmit}>
                        <div className='w-[465px] h-[48px] border-solid border border-gray-100 bg-[#FFFFFF]'>
                            <input className='border-none w-[430px] mt-[10px] text-[14px] mr-[10px] h-[30px]' placeholder="별명 입력" type="text" name="groupId" onChange={ChangenickName}/>
                            <input className='border-none w-[430px] mt-[10px] text-[14px] mr-[10px] h-[30px]' placeholder="비밀번호 입력" type="password" name="pwd" onChange={ChangePwd}/>
                        </div>
                        <div className='pt-[90px]'>
                            <button className='w-[465px] h-[48px] text-[18px] bg-[#555555] text-white border-solid border border-[#555555]' type="submit">로그인</button>
                        </div>
                    </form>
                </section>
            </div>
    </Link>
    </>
  )

export default SignIn