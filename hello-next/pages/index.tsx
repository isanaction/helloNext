import { collection, getDocs } from '@firebase/firestore'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { db } from '../utils/firebase'

const Home: NextPage = () => {
  const [todos,setTodos] = useState([])
  const todosCollectionRef = collection(db,'todos')

  useEffect(()=>{
    const getTodos = async()=>{
      const data = await getDocs(todosCollectionRef)
      setTodos(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    }

    getTodos()
  },[])

  return (
    <>
      <div className="">
        <div className="container mx-auto my-5 text-5xl font-bold font-sans ">
          <div className="text-red-500 text-center">Next.js Todo</div>
          <div className="flex">
            {todos.map((todo)=>{
              return(
                <>
                <div className="m-3 bg-gray-100 p-3 rounded border">
                  <div className="text-xl text-center">{todo.title}</div>
                  <div className="text-sm mt-2">{todo.body}</div>
                </div>
                </>
              )
            })}
          </div>

        </div>
      </div>
    </>
  )
}

export default Home
