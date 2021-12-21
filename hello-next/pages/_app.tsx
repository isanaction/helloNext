// import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { UserContext } from '../src/contexts/UserContext'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import router from 'next/router';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState({})
  const auth = getAuth();
  // const user = auth.updateCurrentUser
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    } else {
      // User is signed out
      // router.push('/login')
    }
  });
  return (
    <UserContext.Provider value={user}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}

export default MyApp
