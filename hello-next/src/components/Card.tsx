import React, { useContext, useEffect, useState } from 'react'
import { collection, addDoc, updateDoc, query } from '@firebase/firestore'
import { db } from '../../utils/firebase'
import { deleteDoc, doc, onSnapshot, orderBy, where } from 'firebase/firestore';
import { UserContext } from '../contexts/UserContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';


export default function Card({ card }) {

  const user = useContext(UserContext)

  const [todos, setTodos] = useState([])
  const [value, setValue] = useState('');
  const [open, setOpen] = useState('');
  const router = useRouter()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const auth = getAuth();


  onAuthStateChanged(auth, (user) => {
    if (user) {
      const q = query(collection(db, 'todos'), where('uid', '==', user.uid), orderBy('created_at', 'asc'))
      onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => (
          {
            data: doc.data(),
            id: doc.id
          })
        )
        setTodos(data)

      })

    } else {
      // User is signed out
      router.push('/login')
    }
  })


  // const AddTodo = async () => {
  //   await addDoc(collection(db, "todos"), {
  //     title: value
  //   })
  // }
  const Edit = async (id: string) => {
    await addDoc(collection(db, "todos"), {
      body: value,
      created_at: Date.now(),
      card_id: id,
      uid: user.uid
    })
  }


  const Delete = async (id: string) => {
    const docRef = doc(db, 'card', id)
    await deleteDoc(docRef);
  }
  // useEffect(() => {


  // }, [])

  return (
    <div>
      <div className={`box-border h-72 w-72 bg-${card.data.color}-300	border m-5   rounded  shadow-xl relative text-gray-600`} >
        <div className="p-4">
          <div className="text-xl text-center font-bold">{card.data.title}</div>
          {todos.map((todo, index) => {
            if (todo.data.card_id === card.id) {
              return (
                <div key={index} className="text-sm" > {todo.data.body}</div>
              )
            }
            else {
              return null
            }


          })}
          <div className=" flex">


            {open == card.id ?
              <>
                <div className="border-b">
                  <input type="text" onChange={handleChange} className={`bg-${card.data.color}-300  focus:outline-none  text-sm pt-2 ml-2`} />
                  <button onClick={() => Edit(card.id)} className="flex-shrink-0  border-teal-500 hover:border-teal-700 text-xs mx-3 text-blue-500 rounded  p-2" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>

              </>
              :
              <button className=" " onClick={() => setOpen(card.id)} type="button">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>}

            <div className="flex-1"></div>
          </div>

        </div>
        <div className="flex"></div>



        <button onClick={() => { Delete(card.id) }} className=' border-yellow-600 absolute right-0 bottom-0 border-r-8 hover:border-gray-50 ' style={{
          borderTop: '50px solid transparent',
          borderRight: '50px solid ',
        }}>
        </button>
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-0 bottom-0 h-6 w-6 text-gray-400 pointer-events-none	" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>
    </div >
  )
}
