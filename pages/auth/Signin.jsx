import React, { useState } from 'react'
import { useAtom } from 'jotai'
import authAtom from '../../public/stores/authAtom'
import { useRouter } from 'next/router'

const SignUp = () => {
    const [nickName,setNickName] = useState('')
    const [pwd,setPwd] = useState('')
    const [auth, setAuth] = useAtom(authAtom)
    const route = useRouter();

    const ChangeNickName = e => {
        setNickName(e.target.value)
    }
    const ChangePwd = e => {
        setPwd(e.target.value)
    }
    const handleSubmit=e=>{
        e.preventDefault()
        console.log(nickName)
    }
    
    const loginHandler = (event) => {
    event.preventDefault();
    // const {groupId} = values;
        
    const submitValue = {nickName, pwd};
         

    const options = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitValue)

    };
    fetch('http://localhost:3040/sign-up', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .then(console.log(auth))
    .catch(error => console.log(error))
    .then(route.push('/'))

    

}
    return (
     
            <div className='align-middle pt-[300px]'>
                
            <section className='pt-[40px] flex flex-col items-center'>
                    <form method="POST" action="http://localhost:9001" onSubmit={loginHandler}>
                        <div className='w-[465px] h-[48px] border-solid border border-gray-100 bg-[#FFFFFF]'>
                            <input className='border-none w-[430px] mt-[10px] text-[14px] mr-[10px] h-[30px]' placeholder="그룹아이디 입력" type="text" name="nickName" onChange={ChangeNickName}/>
                        </div>
                        <div className='w-[465px] h-[48px] border-solid border border-gray-100 bg-[#FFFFFF]'>
                            <input className='border-none w-[430px] mt-[10px] text-[14px] mr-[10px] h-[30px]' placeholder="비밀번호 입력" type="text" name="pwd" onChange={ChangePwd}/>
                        </div>
                        <div className='pt-[13px]'>
                            <button className='w-[465px] h-[48px] text-[18px] bg-[#555555] text-white border-solid border border-[#555555]' type="submit">로그인</button>
                        </div>
                    </form>
                </section>
            </div>
    
    )
    }
export default SignUp