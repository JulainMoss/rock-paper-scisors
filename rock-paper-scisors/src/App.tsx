import './App.css'
import Select from './Select'
import Game from './Game'
import { useState } from 'react'

function App() {
  const [opponent, setOpponent] = useState("random")
  const [game, setGame] = useState(0)
  
  return (
    game ? <Game opponent={opponent} /> : <Select game={game} setGame={setGame} setOpponent={setOpponent} />
  )
}

export default App
