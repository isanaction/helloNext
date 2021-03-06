import React, { useContext } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { UserContext } from '../contexts/UserContext';
import { RenderCount } from '../../utils/RenderCount';


export const Header = () => {
  const user = useContext(UserContext)
  const Logout = () => {

    const auth = getAuth();
    signOut(auth).then(() => {

    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div className="w-100 h-10 bg-gray-50 shadow-sm flex justify-end p-2">
      <RenderCount />
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
      </svg>
      <div className="">{user.email} </div>
      <button onClick={Logout} className='border'>ログアウト</button>
    </div>
  )
}
