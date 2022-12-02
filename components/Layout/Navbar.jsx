import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-violet-900">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8" />
      <div className="relative flex h-16 items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          {/* <!-- Mobile menu button--> */}
          <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            {/* <!--
            Icon when menu is closed.

            Heroicon name: outline/bars-3

            Menu open: "hidden", Menu closed: "block"
          --> */}
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            {/* <!--
            Icon when menu is open.

            Heroicon name: outline/x-mark

            Menu open: "block", Menu closed: "hidden"
          --> */}
            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
            <p className="ml-3 mr-3 inline-flex items-center justify-center whitespace-nowrap rounded-full border border-transparent bg-violet-600 px-4 py-2 text-base font-extrabold text-gray-300 shadow-sm hover:bg-pink-300 hover:text-gray-600">
              아띠의 고민 상담소
            </p>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
              <Link href="/Board" className="text-gray-300 hover:bg-pink-300 hover:text-white hover:font-extrabold px-3 py-2 rounded-md text-sm font-semibold">직업</Link>
              <Link href="/Board" className="text-gray-300 hover:bg-pink-300 hover:text-white hover:font-extrabold px-3 py-2 rounded-md text-sm font-semibold">대인관계</Link>
              <Link href="/Board" className="text-gray-300 hover:bg-pink-300 hover:text-white hover:font-extrabold px-3 py-2 rounded-md text-sm font-semibold">가족</Link>
              <Link href="/Board" className="text-gray-300 hover:bg-pink-300 hover:text-white hover:font-extrabold px-3 py-2 rounded-md text-sm font-semibold">연애</Link>
              <Link href="/Board" className="text-gray-300 hover:bg-pink-300 hover:text-white hover:font-extrabold px-3 py-2 rounded-md text-sm font-semibold">잡담</Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          
            <span className="sr-only">View notifications</span>
            {/* <!-- Heroicon name: outline/bell --> */}
            
          

          {/* <!-- Profile dropdown --> */}
          <div className="relative ml-3">
            

            {/* <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <Link href="#" className="text-gray-300 hover:bg-pink-300 hover:text-white block px-3 py-2 rounded-md text-base font-bold">
              Login
            </Link>
            <Link href="#" className="ml-3 mr-3 inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-transparent bg-violet-500 px-4 py-2 text-base font-bold text-gray-300 shadow-sm hover:bg-indigo-700">
              Join
            </Link>
          </div>
          </div>
        </div>
      </div>
    

  <div className="sm:hidden" id="mobile-menu">
    <div className="space-y-1 px-2 pt-2 pb-3">
    <Link href="/Board" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">직업</Link>
    <Link href="/Board" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">대인관계</Link>
    <Link href="/Board" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">가족</Link>
    <Link href="/Board" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">연애</Link>
    <Link href="/Board" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">잡담</Link>
    </div>
  </div>
</nav >
  )
}

export default Navbar