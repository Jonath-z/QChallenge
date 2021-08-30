import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";


const Signup = () => {
    const [email, setEmail] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');


    const signup = () => {
        console.log(email, pseudo, password);
    }



    return (
        <div>
            {/* <form> */}
            <input type='email' name='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}></input>
            <input type='text' name='pseudo' placeholder='Pseudo' value={pseudo} onChange={e => setPseudo(e.target.value)}></input>
            <input type='password' name='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}></input>
            <button onClick={signup}>Login</button>
            {/* </form> */}
        </div>
    );
}

export default Signup;