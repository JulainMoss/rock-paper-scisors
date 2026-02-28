import rock from './assets/rock.svg'
import paper from './assets/paper.svg'
import scissors from './assets/scissors.svg'

import './App.css'

export default function Select({game, setGame, setOpponent}) {  
  

  return (
    <>
      <div>
        <img src={rock} className="logo" alt="Vite logo" />
        <img src={paper} className="logo" alt="React logo" />
        <img src={scissors} className="logo" alt="React logo" />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => {setGame(!game); setOpponent("random")}}>
          Play random
        </button>
        <button onClick={() => {setGame(!game); setOpponent("other-random")}}>
          Play smarter random
        </button>
      </div>
    </>
  )
}