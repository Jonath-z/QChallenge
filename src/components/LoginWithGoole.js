import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { useState } from 'react';


const clientID = `${process.env.REACT_APP_GOOGLE_LOGIN_KEY}`


const LoginWithGoogle = () => {
    let history = useHistory();
    const [waitForLogin, setWaitForLogin] = useState(true);
    const onSuccess = (res) => {
        if (res !== null) {
            const registerUSer = async () => {
                // const fetchData = async () => {
                const theme = await fetch(`${REACT_APP_QCHALLENGE_API_URI}/theme`);
                const responseTheme = await theme.json();
                const themeDetails = responseTheme.map(theme => {
                    return {
                        theme: theme.theme,
                        score: 0,
                        level: 0
                    }
                });
                // console.log(themeDetails);
            
                await fetch(`${REACT_APP_QCHALLENGE_API_URI}/login-With-Google`, {
                    method: "POST",
                    headers: {
                        'accept': '*/*',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: res.profileObj.googleId,
                        email: res.profileObj.email,
                        pseudo: res.profileObj.givenName,
                        avatar: res.profileObj.imageUrl,
                        score: themeDetails,
                        socketID: ''
                    })
                })
                    .then(res => { return res.json() })
                    .then(data => {
                        const allQuestions = JSON.parse(localStorage.getItem('userQuestions'));
                        window.localStorage.setItem('user', JSON.stringify(data));
                        // console.log('all questions :', allQuestions);
                        if (allQuestions !== null) {
                            history.push(`/QChallenge/?id=${data.data.id}`);
                            // console.log('question is null');
                            setWaitForLogin(true);
                        }
                    });
            }
            registerUSer();
        }

    };
    const onFailure = (res) => {
        // console.log('login failed res:', res);
        alert('login failed');
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '-20px'}}>
            {waitForLogin ?<GoogleLogin
                clientId={clientID}
                buttonText='Login with Google'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '0px', borderRadius: '10px' }}
                isSignedIn={true}
            />:<p><FaSpinner className='spaniner' /></p>}
        </div>
    )
}

export default LoginWithGoogle
