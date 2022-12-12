import Navbar from '../components/Layout/Navbar'
import AfterNavbar from '../components/Layout/AfterNavbar'
import '../styles/globals.css'
import authAtom from '../public/stores/authAtom'
import { useAtom } from 'jotai';

function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useAtom(authAtom);
  return(
  <>
    {auth.token == null? <Navbar/> : <AfterNavbar/>}
    <Component {...pageProps} />
  </>
  )
}

export default MyApp
