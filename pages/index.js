import Head from 'next/head'
import Image from 'next/image'
import Main from '../components/Layout/Main'
import Navbar from '../components/Layout/Navbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Navbar />
      {/* 네비게이션 부분 */}
      <Main />
      {/* 메인부분 */}
    </>
  )
}
