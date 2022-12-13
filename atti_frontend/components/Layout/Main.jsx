import React from 'react'

const Main = () => {
  return (
    <div>
      <div className="bg-[url('/images/10.jpg')] bg-cover opacity-80">
          <div className="flex justify-center items-center min-h-screen text-xl font-extrabold ...">
            <span className="text-center text-transparent opacity-100 bg-clip-text bg-text-center bg-gradient-to-r from-pink-200 to-gray-200">
              오늘 하루 어땠나요?<br/>털어놓기 힘든 고민 때문에 힘겨웠나요?<br/><br/>그렇다면 당신의 고민을 글로 적어보세요.<br/>혼자 애쓰지 않아도 괜찮아요.<br/>들어줄게요 당신이 괜찮아질 때까지.<br/><br/>뜻밖의 위로가 기다리고 있을 지도 몰라요.
            </span>
          </div>

      {/* <div class="lg:w-full w-full bg-blue-0">
       <div class="xxx_imgWrap flex flex-col my-auto items-center mx-3">
          <div class="flex h-screen">
             <div class="m-auto">
                <img src="/images/1.jpg" width="140">
             </div>
          </div>
       </div>
       </div> */}
      </div>

        {/* 문구 그라데이션 */}
       {/* <div class="bg-gradient-to-r from-purple-900 to-pink-900"> */}
       {/* <div className="bg-fixed bg-pink-300 bg-center bg-repeat bg-cover"
      // style={{backgroundImage: url(./images/1.jpg)}}">
      //   style={{marginRight: spacing + 'em'}}
      // </div> */}

     </div>
  )
}

export default Main