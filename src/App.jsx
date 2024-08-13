import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import MainChat from './components/MainChat/MainChat'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sidebar/>
      <MainChat/>
    </>
  )
}

export default App
