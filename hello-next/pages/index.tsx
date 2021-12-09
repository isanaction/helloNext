import { collection, getDocs, addDoc } from '@firebase/firestore'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { doc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from '../utils/firebase'
import Link from 'next/link'
import { Header } from '../src/components/Header'


// type Data = {
//   title: string;
//   body: string
// }

const Home: NextPage = () => {
  const [todos, setTodos] = useState([{ data: { title: '', body: '', color: '' }, id: '' }])
  const [value, setValue] = useState('');
  const todosCollectionRef = collection(db, 'todos')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const AddTodo = async () => {
    await addDoc(collection(db, "todos"), {
      title: value
    })
  }

  const Add = async (e: any) => {
    const color = e.target.value
    await addDoc(collection(db, "todos"), {
      color: color
    })
  }

  const Edit = () => {
    console.log('編集')
  }
  const Delete = async (id: string) => {
    console.log(id)
    const docRef = doc(db, 'todos', id)
    await deleteDoc(docRef);
  }

  useEffect(() => {
    onSnapshot(collection(db, 'todos'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id
      })
      )
      setTodos(data)
    })

  }, [])

  return (
    <>
      <div className="bg-gray-100">

        <Header />
        <div className="container mx-auto my-5 text-5xl font-sans ">
          {/* <div className="text-red-400 text-center m-4">Lets's Post It</div> */}
          {/* <form className="">
            <div className="flex items-center">
              <input onChange={onChange} className=" appearance-none bg-white focus:ring-blue-400 bg-transparent border w-full text-sm  p-3 rounded" type="text" placeholder="Jane Doe" aria-label="Full name" />
              <button onClick={AddTodo} className="flex-shrink-0  bg-blue-400 hover:bg-blue-600 border-teal-500 hover:border-teal-700 text-sm mx-3 text-white rounded px-4 p-2" type="button">
                追加
              </button>
            </div>
          </form> */}
          <div className="flex justify-center">
            <button className="bg-yellow-300 h-5 w-24" onClick={Add} value={'yellow'}></button>
            <button className="bg-red-300 h-5 w-24" onClick={Add} value={'red'}></button>
            <button className="bg-blue-300 h-5 w-24" onClick={Add} value={'blue'}></button>
            <button className="bg-green-300 h-5 w-24" onClick={Add} value={'green'}></button>
            <button className="bg-pink-300 h-5 w-24" onClick={Add} value={'pink'}></button>
          </div>

          <div className="flex flex-wrap">
            {todos.map((todo, index) => {

              return (
                <div key={index}>
                  <div className={`box-border h-72 w-72 bg-${todo.data.color}-300	border m-5   rounded  shadow-xl relative`} >
                    <div className="p-4">
                      <div className="text-xl text-center font-bold">{todo.data.title}</div>
                      <div className="text-sm p-2">{todo.data.body}</div>
                      <div className=" flex">

                        <Link href="/edit">
                          <button className=" " type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                        </Link>

                        <div className="flex-1"></div>
                        {/* <button className=" " type="button">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button> */}
                      </div>

                    </div>
                    <div className="flex"></div>

                    <button onClick={() => { Delete(todo.id) }} className=' border-yellow-600 absolute right-0 bottom-0 border-r-8 hover:border-gray-50 skew-y-4' style={{
                      borderTop: '50px solid transparent',
                      borderRight: '50px solid ',
                    }}>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </>
  )
}

export default Home
