import { type Dispatch, type SetStateAction } from 'react';

interface LogInProps {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export default function LogIn({setLoggedIn}: LogInProps) {
    function handleLogIn() {
        setLoggedIn(true);
    }   

    return (
        <div>
            <div>
                <h1>Log in</h1>
                <input type="text" placeholder='Username' />
            </div>
            <div>
                <input type="password" placeholder='Password' />
            </div>
            <button onClick={handleLogIn}>Log in</button>
        </div>
    )
}