import AuthProvider from '@/contexts/AuthContext';
import '../../styles/global.scss'
import { AppProps } from "next/app";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {

    return (
        <AuthProvider>
            <Component {...pageProps} />
            <ToastContainer autoClose={3000}/>
        </AuthProvider>
    )
}

export default MyApp






