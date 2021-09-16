import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';


const clientID = '688414082981-656lplq2khvpkpucff94dv5080u79h9f.apps.googleusercontent.com'
const clientSecret = 'QFVMBStjdCTy8DmpzdALow7D';

const LoginWithGoogle = () => {
    let history = useHistory();
    const onSuccess = (res) => {
        if (res !== null) {
            const registerUSer = async () => {
                // const fetchData = async () => {
                const theme = await fetch('../theme');
                const responseTheme = await theme.json();
                const themeDetails = responseTheme.map(theme => {
                    return {
                        theme: theme.theme,
                        score: 0,
                        level: 0
                    }
                });
                console.log(themeDetails);
            
                await fetch('../login-With-Google', {
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
                        window.localStorage.setItem('user', JSON.stringify(data));
                        history.push(`/QChallenge/?id=${data.data.id}`);
                        console.log('[Login sucess] current user:', res.profileObj.email);
                    })
            }
            registerUSer();
        }

    };
    const onFailure = (res) => {
        console.log('login failed res:', res);
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '-20px'}}>
            <GoogleLogin
                clientId={clientID}
                buttonText='Login with Google'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '0px',borderRadius:'10px'}}
                isSignedIn={true}
            />
        </div>
    )
}

export default LoginWithGoogle
