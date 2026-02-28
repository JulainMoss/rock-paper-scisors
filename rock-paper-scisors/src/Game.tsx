import { useEffect, useState } from 'react'
import rock from './assets/rock.svg'
import paper from './assets/paper.svg'
import scissors from './assets/scissors.svg'

export default function Game({opponent}) {
    const moves = [rock, paper, scissors]
    const [aimove, setAimove] = useState(0)
    const [playermove, setPlayermove] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const getAimove = async (currentOpponent) => {
        setIsLoading(true);
        try {
            const res = await fetch(`http://localhost:8000/api/${currentOpponent}`);
            const json = await res.json();
            setAimove(json.wiadomosc);
        } catch (error) {
            console.error("Błąd komunikacji z Pythonem:", error);
        } finally {
            setIsLoading(false); // Kończymy 
        }
    };

    useEffect(() => {
        const handleGlobalKeyUp = (e) => {
            
            if (e.key === 'Control') {
                setPlayermove(0)
            } else if (e.key === 'Shift') {
                setPlayermove(1)
            } else if (e.key === 'Enter') {
                setPlayermove(2)
            } else {return};
            console.log(e.key)
            getAimove(opponent)
        };
        window.addEventListener('keyup', handleGlobalKeyUp)
        return () => {
            window.removeEventListener('keyup', handleGlobalKeyUp)
        }
    }, [])
    return (
        <div >
            <h1 className='instructions'>Press CTRL for Rock, SHIFT for Paper, ENTER for Scissors</h1>
            <div>
                <p className='player-text'>AI move:</p>
                <img src={moves[aimove]} alt="AI move" className='move' style={isLoading ? {filter: "opacity(50%) drop-shadow(0 0 2em #808080aa)" } : {}}/>
            </div>
            <div>
                <p className='player-text'>Your move:</p>
                <img src={moves[playermove]} alt="Player move" className='move'/>
            </div>
        </div>
        
    )
}