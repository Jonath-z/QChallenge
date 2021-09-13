import Signup from "./SignUp";
import './Login.css';
import { useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import storage from "../modules/firbaseConfig";
import { FaSpinner } from 'react-icons/fa';


const Login = () => {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginErr, setLoginErr] = useState('');
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [avatar, setAvatar] = useState(null);
    
    useEffect(() => {
        const getdefaultAvatar = async () => {
            await storage.ref('NicePng_avatar-png_3012856.png').getDownloadURL()
                .then(url => {
                    setAvatar(url);
                    // console.log(url);
                    return url;
                });
        }
        getdefaultAvatar();
    }, []);

    const goToSignup = () => {
        setShowSignup(true);
        setShowLogin(false);
    }
    const login = () => {
        const postLogins = async() => {
            const response = await fetch('../login', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'content-type': 'application/json'
                },
                body:JSON.stringify({
                    email: email,
                    password:password
                })
            });
            const data = await response.json();
            if (data.status === '200') {
                console.log(data.id);
                history.push(`/QChallenge/?id=${data.id}`);
                window.location.reload();
                // window.location.href='/QChallenge';
                // <Redirect to='/QChallenge' />
            }
            else if (data.status === '404') {
                setLoginErr('Incorrect password');
            }
            else if (data.status === '404 email') {
                setLoginErr('Incorrect password or email');
            }

            return () => {
                setEmail('');
                setPassword('');
                setLoginErr('');
            }
        }
        postLogins();
    }

    return (
        <div>
            <div className='avatart-container'>
                {
                    avatar ? <img src={avatar} alt='profile' id='default-avatar' />
                        : <p><FaSpinner className='spaniner' /></p>
                }
            </div>
            <div className='loginContainer'>
                <h1 className="appName">QChallenge</h1>
                {showLogin && <div className='login'>
                    <input type='email' name='email' placeholder='Email' value={email} onChange={e => { setEmail(e.target.value) }}></input>
                    <input type='password' name='password' placeholder='Password' value={password} onChange={e => { setPassword(e.target.value) }}></input>
                    <p className='loginErr'>{loginErr}</p>
                    <button onClick={login} className='loginBtn'>Submit</button>
                    <button onClick={goToSignup} className='signupBtn'>Signup</button>
                </div>}
                {showSignup && <Signup />}
            </div>
        </div>
    );
}

export default Login;