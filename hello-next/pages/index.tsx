import { collection, getDocs, addDoc, orderBy, query, where, updateDoc } from '@firebase/firestore'
import type { NextPage } from 'next'
import React, { useContext, useEffect, useState } from 'react'
import { onSnapshot } from "firebase/firestore";
import { db } from '../utils/firebase'
import useSound from 'use-sound'
import Layout from '../src/components/Layout'
import Card from '../src/components/Card';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Router, useRouter } from 'next/router';
import { UserContext } from '../src/contexts/UserContext';


// type Data = {
//   title: string;
//   body: string
// }

const Home: NextPage = () => {
  const [cards, setCards] = useState([{ data: { title: '', body: '', color: '' }, id: '' }])
  const [userState, setUserState] = useState({})
  const router = useRouter()
  const user = useContext(UserContext)

  const auth = getAuth();



  const Add = async (e: any) => {
    const color = e.target.value
    await addDoc(collection(db, "card"), {
      color: color,
      created_at: Date.now(),
      uid: user.uid
    })
  }



  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(collection(db, 'card'), where('uid', '==', user.uid), orderBy('created_at', 'desc'))

        onSnapshot(q, (snapshot) => {
          const data = snapshot.docs.map((doc) => (
            {
              data: doc.data(),
              id: doc.id
            })
          )
          setCards(data)
        })

      } else {
        // User is signed out
        router.push('/login')
      }
    })
  }, [])

  return (
    <Layout>
      <div className="container mx-auto my-5 text-5xl font-sans ">
        <div className="flex justify-center">
          <button className="bg-yellow-300 h-5 w-24" onClick={Add} value={'yellow'}></button>
          <button className="bg-red-300 h-5 w-24" onClick={Add} value={'red'}></button>
          <button className="bg-blue-300 h-5 w-24" onClick={Add} value={'blue'}></button>
          <button className="bg-green-300 h-5 w-24" onClick={Add} value={'green'}></button>
          <button className="bg-pink-300 h-5 w-24" onClick={Add} value={'pink'}></button>
        </div>

        <div className="flex flex-wrap">
          {cards.map((todo, index) => {

            return (
              <div key={index}>
                <Card card={todo} />
                {/* {console.log(todo)} */}
              </div>
            )
          })}
        </div>

      </div>
    </Layout>
  )
}

export default Home
