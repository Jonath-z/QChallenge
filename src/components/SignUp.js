import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";


const Signup = () => {

    const [email, setEmail] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [loginErr, setLoginErr] = useState('');

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
            if (response ==="error") {
                setLoginErr('something went wrong,(your password must have 4 characters minimum)');
            }
            console.log(response);
            return () => {
                email = '';
                pseudo = '';
                password = '';
                loginErr = '';
            }
        }
        fetchData();
    }

    return (
        <div>
            {/* <form> */}
            <input type='email' name='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}></input>
            <input type='text' name='pseudo' placeholder='Pseudo' value={pseudo} onChange={e => setPseudo(e.target.value)}></input>
            <input type='password' name='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}></input>
            <p className="errorPara">{loginErr}</p>
            <button onClick={registerUser}>Login</button>
            {/* </form> */}
        </div>
    );
}

export default Signup;