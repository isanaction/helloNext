import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { db } from '../utils/firebase'

const Home: NextPage = () => {
  // const ref = db.collection('todo').get()
  return (
    <>
    <div className="text-red-500">Next.js</div>
    
    </>
  )
}

export default Home
