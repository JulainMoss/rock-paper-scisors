import { useEffect, useState } from 'react'
import rock from './assets/rock.svg'
import paper from './assets/paper.svg'
import scissors from './assets/scissors.svg'

export default function Game({opponent}) {
    const moves = [rock, paper, scissors]
    const [aimove, setAimove] = useState(0)
    const [playermove, setPlayermove] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [score, setScore] = useState([0, 0])

    const getAimove = async (currentOpponent) => {
        setIsLoading(true);
        try {
            const res = await fetch(`http://localhost:8000/api/${currentOpponent}`);
            const json = await res.json();
            
            return json.wiadomosc; // ZWRACAMY wartość do await
        } catch (error) {
            console.error("Błąd:", error);
            return null; 
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleGlobalKeyUp = async (e) => {
            let move;
            if (e.key === 'Control') {
                move = 0;
            } else if (e.key === 'Shift') {
                move = 1;
            } else if (e.key === 'Enter') {
                move = 2;
            } else {return};
            setPlayermove(move)
            
            const response = await getAimove(opponent)
            setAimove(response);
            if (move === response) {
                return
            } else if ((move === 0 && response === 2) || (move === 1 && response === 0) || (move === 2 && response === 1)) {
                setScore(prev => [prev[0] + 1, prev[1]])
            } else {
                setScore(prev => [prev[0], prev[1] + 1])
            }
        };
        window.addEventListener('keyup', handleGlobalKeyUp)
        return () => {
            window.removeEventListener('keyup', handleGlobalKeyUp)
        }
    }, [])

    return (
        <div >
            <h1 className='instructions'>Press CTRL for Rock, SHIFT for Paper, ENTER for Scissors</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <p className='player-text'>AI move:</p>
                <img src={moves[aimove]} alt="AI move" className='move' style={isLoading ? {filter: "opacity(50%) drop-shadow(0 0 2em #808080aa)" } : {}}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <p className='player-text'>Score: {score[0]} - {score[1]}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <p className='player-text'>Your move:</p>
                <img src={moves[playermove]} alt="Player move" className='move'/>
            </div>
        </div>
        
    )
}