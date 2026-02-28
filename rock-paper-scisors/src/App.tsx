import './App.css'
import Select from './Select'
import Game from './Game'
import LogIn from './Log-in'
import { useState } from 'react'

function App() {
  const [opponent, setOpponent] = useState("random")
  const [game, setGame] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  
  return (
    loggedIn ? game ? <Game opponent={opponent} /> : <Select game={game} setGame={setGame} setOpponent={setOpponent} /> : <LogIn setLoggedIn={setLoggedIn} />
  )
}

export default App
