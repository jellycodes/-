import Navbar from '../components/Layout/Navbar'
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}
export default MyApp