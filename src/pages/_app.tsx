import '../styles/globals.css'
import { AppProvider } from '../data/context/AppContext'
import { AuthProvider } from '../data/context/AuthContext'
import StripeContext from '../data/context/StripeContext';

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <AppProvider {...pageProps}>
                <StripeContext {...pageProps}>
                    <Component {...pageProps} />
                </StripeContext>
            </AppProvider>
        </AuthProvider>
    )
}

export default MyApp
