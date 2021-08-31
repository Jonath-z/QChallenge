import React, { useState} from 'react';
import Login from './Login';
import './Login.css';
// import { useForm } from "react-hook-form";


const Signup = () => {

    const [email, setEmail] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [loginErr, setLoginErr] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(true);

    // console.log(email, pseudo, password);
    const registerUser = () => {
        const fetchData = async () => {
            const data = await fetch('../signup', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    pseudo: pseudo,
                    password: password
                })
            });
            const response = await data.text();
            if (response === "error") {
                setLoginErr('something went wrong,(your password must have 4 characters minimum)');
                console.log(response);
            }
            else if (response === '200') {
                console.log(response);
                setShowSignup(!showSignup);
                setShowLogin(!showLogin);
            }
            
            return () => {
                setEmail('');
                setPseudo('');
                setPassword('');
                setLoginErr('');
            }
        }
        fetchData();
    }

    return (
        <div className='loginContainer'>
            {showSignup && <div className='login'>
                {/* <form> */}
                <input type='email' name='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}></input>
                <input type='text' name='pseudo' placeholder='Pseudo' value={pseudo} onChange={e => setPseudo(e.target.value)}></input>
                <input type='password' name='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}></input>
                <p className="loginErr">{loginErr}</p>
                <button onClick={registerUser} className='loginBtn'>Login</button>
                {/* </form> */}
            </div>}
            {showLogin && <Login />}
        </div>
    );
}

export default Signup;