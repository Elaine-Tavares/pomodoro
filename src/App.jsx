import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PomodoroTimer from './components/PomodoroTimer'
import Footer from './components/Footer'

function App() {


  return (
    <>
     <PomodoroTimer/>
     <Footer/>
    </>
  )
}

export default App
