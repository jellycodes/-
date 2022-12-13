import React from 'react'


const BoardPaging = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);
  
// const Button = styled.button`
//   border: none;
//   border-radius: 8px;
//   padding: 8px;
//   margin: 0;
//   background: black;
//   color: white;
//   font-size: 1rem;

//   &:hover {
//     background: tomato;
//     cursor: pointer;
//     transform: translateY(-2px);
//   }

//   &[disabled] {
//     background: grey;
//     cursor: revert;
//     transform: revert;
//   }

//   &[aria-current] {
//     background: deeppink;
//     font-weight: bold;
//     cursor: revert;
//     transform: revert;
//   }

  return (
    <> 
      <nav className='flex justify-center items-center gap-1 m-4'>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
              className='font-bold'
            >
              {i + 1}
            </button>
          ))}
        <button onClick={() => setPage(page + 1)} disabled={page === numPages} className=''>
          &gt;
        </button>
      </nav>
    </>
  )
}

// 일단 스타일 컴포넌트는 무시하는걸로

// const Nav = styled.nav`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 4px;
//   margin: 16px;
// `;

// const Button = styled.button`
//   border: none;
//   border-radius: 8px;
//   padding: 8px;
//   margin: 0;
//   background: black;
//   color: white;
//   font-size: 1rem;

//   &:hover {
//     background: tomato;
//     cursor: pointer;
//     transform: translateY(-2px);
//   }

//   &[disabled] {
//     background: grey;
//     cursor: revert;
//     transform: revert;
//   }

//   &[aria-current] {
//     background: deeppink;
//     font-weight: bold;
//     cursor: revert;
//     transform: revert;
//   }
// `;

export default BoardPaging
