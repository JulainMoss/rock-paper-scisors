import { useState, type Dispatch, type SetStateAction } from 'react';

interface LogInProps {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export default function LogIn({setLoggedIn}: LogInProps) {
    // 1. Tworzymy stany dla pól formularza
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [logIn, setLogIn] = useState(true); // true = logowanie, false = rejestracja

    function handleLogIn() {
        if (logIn) {
            console.log("Logowanie użytkownika:", username);
            console.log("Hasło (tylko do testów!):", password);

            if (username !== '' && password !== '') {
                setLoggedIn(true);
            } else {
                alert("Wypełnij wszystkie pola!");
            }
        } else {
            clearForm();
            setLogIn(true);
        }
    } 
    function handleSignUp() {
        if (!logIn) {
            console.log("Rejestracja użytkownika:", username);
            console.log("Hasło (tylko do testów!):", password);
        } else {
            clearForm();
            setLogIn(false);
        }
    }

    function clearForm() {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    }

    return (
        <div>
            <h1>{logIn ? "Log in" : "Sign up"}</h1>
            <div>
                <input 
                    type="text" 
                    placeholder='Username' 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <input 
                    type="password" 
                    placeholder='Password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
            {!logIn && (
                
                    <input
                        type="password"
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />  
            )}
            </div>
            <button onClick={handleLogIn}>Log in</button>
            <button onClick={clearForm}>Clear</button>
            <button onClick={handleSignUp}>Sign up</button>
        </div>
    );
}