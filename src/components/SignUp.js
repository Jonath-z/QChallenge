import React, { useState, useEffect } from 'react';
import Login from './Login';
import './Login.css';
import storage from "../modules/firbaseConfig";


const Signup = () => {
    const [email, setEmail] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [loginErr, setLoginErr] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(true);
    const [avatar, setAvatar] = useState(null);

    // console.log(email, pseudo, password);
    useEffect(() => {
        const getdefaultAvatar = async () => {
            await storage.ref('NicePng_avatar-png_3012856.png').getDownloadURL()
                .then(url => {
                    setAvatar(url);
                    return url;
                });
        }
        getdefaultAvatar();
    }, []);

    const registerUser = () => {
        if (avatar !== null) {
            const fetchData = async () => {
                const theme = await fetch('../theme');
                const responseTheme = await theme.json();
                const themeDetails = responseTheme.map(theme => {
                    return {
                        theme: theme.theme,
                        score: 0,
                        level: 0
                    }
                });
                // console.log(themeDetails);
                const data = await fetch('../signup', {
                    method: 'POST',
                    headers: {
                        'accept': '*/*',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        pseudo: pseudo,
                        password: password,
                        avatar: `${avatar}`,
                        score: themeDetails,
                        socketID: ''
                    })
                });
                const response = await data.text();
                if (response === "error") {
                    setLoginErr('something went wrong,(your password must have 4 characters minimum)');
                    // console.log(response);
                }
                else if (response === '200') {
                    // console.log(response);
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
    }

    return (
        <>
            {showSignup && <div className='loginContainer signup-div'>
                <div className='login'>
                    <h1 className='logPageTitle'>Sign Up</h1>
                    <input type='email' name='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}></input>
                    <input type='text' name='pseudo' placeholder='Pseudo' value={pseudo} onChange={e => setPseudo(e.target.value)}></input>
                    <input type='password' name='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}></input>
                    <p className="loginErr">{loginErr}</p>
                    <button onClick={registerUser} className='loginBtn'>Submit</button>
                    <p className='singup-para' onClick={() => {
                        setShowLogin(true);
                        setShowSignup(false);
                    }}>Return to log in </p>
                </div>
                {showLogin && <Login />}
            </div>}
            {showLogin && <Login />}
        </>
    );
}

export default Signup;