import './Account.css'
import { useEffect, useState } from "react";
import { BsPlusCircleFill } from 'react-icons/bs';
import storage from '../modules/firbaseConfig';
const userID = window.location.search.replace('?id=', '');

const Account = () => {
    const [userProfile, setUserProfile] = useState();
    const [userProfileEmail, setUserProfileEmail] = useState();
    const [showInputEmail, setShowInputEmail] = useState('none');
    const [showInputPseudo, setShowInputPseudo] = useState('none');
    const [showUpdateButton, setShowUpdateButton] = useState(false);
    const [newPseudo, setNewPseudo] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const inputFile = document.createElement('input');
    // ********************* GET USER DATA ********************************//
    useEffect(() => {
        const getUser = async () => {
            await fetch('../get-user-data', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ userID: JSON.parse(localStorage.getItem('user')).data.id })
            })
                .then((res) => { return res.json() })
                .then((data) => {
                    setUserProfileEmail(data.email);
                    console.log(data);
                });
        }
        getUser();
        setUserProfile(JSON.parse(localStorage.getItem('user')));
    }, []);
    // ************************** DISPLAY UPDATE INPUTS ***************************//
    const openInputPseudo = () => {
        if (showInputPseudo === 'block') {
            setShowInputPseudo('none');
        } else {
            setShowInputPseudo('block');
        }
    }
    const openInputEmail = () => {
        if (showInputEmail === 'block') {
            setShowInputEmail('none');
        } else {
            setShowInputEmail('block');
        }
    }
    // ************************ UPDATE PROFILE IMAGE ******************************//
    const uploadProfile = () => {
        inputFile.type = 'file';
        inputFile.click();
        console.log('profile upload')
    }
    const openFolder = () => {
        uploadProfile();
    }

    inputFile.onchange = (event) => {
        const fileName = `image_${Date.now()}`;
        const file = event.target.files;
        const ref = storage.ref('profile-images/' + fileName);
        const uploadTask = ref.put(file[0]);
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.createElement('progress').value = progress;
        },
            (err) => {
                console.log(err);
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(url => {
                    const user = JSON.parse(localStorage.getItem('user'));
                    user.data.avatar = url;
                    localStorage.setItem('user', JSON.stringify(user));
                    console.log(url);
                    setUserProfile(JSON.parse(localStorage.getItem('user')));
                    fetch('../upgate-profile/image', {
                        method: 'POST',
                        headers: {
                            'accept': '*/*',
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ url: url, userID: userID })
                    })
                })
            });
    }
// *************************** CHEK INPUT USER NEWPASSWORD && NEW EMAIL VALUES ***************************//
    const getNewEmail = (e) => {
        setNewEmail(e.target.value);
        if (e.target.value.length > 0) {
            setShowUpdateButton(true);
        }
        if (e.target.value.length === 0 ) {
            setShowUpdateButton(false);
            setNewEmail('');
        }
    }
    const getNewPseudo = (e) => {
        setNewPseudo(e.target.value);
        if (e.target.value.length > 0) {
            setShowUpdateButton(true);
        }
        if (e.target.value.length === 0) {
            setShowUpdateButton(false);
            setNewPseudo('');
        }
    }
    useEffect(() => {
        if (newEmail !== '') {
            setShowUpdateButton(true);
        }
        if (newPseudo !== '') {
            setShowUpdateButton(true);
        }

    }, [newEmail, newPseudo]);
// ***************************** UPDATE USER EMAIL && PASSWORD *********************************//
    const updateProfileDetails = () => {
        const update = async () => {
            await fetch('../update-user-datails', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    newEmail: newEmail,
                    newPseudo: newPseudo,
                    userID: JSON.parse(localStorage.getItem('user')).data.id
                })
            })
        }
        update();
        if (newPseudo !== '') {
            const user = JSON.parse(localStorage.getItem('user'));
            user.data.pseudo = newPseudo;
            localStorage.setItem('user', JSON.stringify(user));
            console.log('newPSeudo', user.data.pseudo);
            document.querySelector('.inputNewPseudo').value = '';
            setNewPseudo('');
        }
        if (newEmail !== '') {
            setUserProfileEmail(newEmail);
            console.log('newEmail', newEmail);
            setNewEmail('');
            document.querySelector('.inputNewEmail').value = '';
        }
        setShowInputEmail('none');
        setShowInputPseudo('none');
        
    }

    return (
        <div className='account'>
            {userProfile !== undefined && <div className='user-profile-container'>
                <div className='profile-image-container'>
                    <img src={userProfile.data.avatar} alt='profile' className='profile-image' />
                    <div className='plus-icon-container'><BsPlusCircleFill className='plus-icon' onClick={openFolder} /></div>
                </div>
                <div className='profile-details-container'>
                    <p className='pseudo' onClick={openInputPseudo}>Pseudo: {JSON.parse(localStorage.getItem('user')).data.pseudo}</p>
                    <input type='text' placeholder='New pseudo' className='inputNewPseudo' onChange={getNewPseudo} style={{
                        display: showInputPseudo
                    }} />
                    <p className='email' onClick={openInputEmail}>Email: {userProfileEmail}</p>
                    <input type='email' placeholder='New email' className='inputNewEmail' onChange={getNewEmail} style={{
                        display: showInputEmail
                    }} />
                </div>
            </div>}
            { showUpdateButton && <div>
                <button className='update-button' onClick={updateProfileDetails}>Update</button>
            </div>}
            {userProfile !== undefined && <div className='user-game-details'>
                <div className='challenge-container'>
                    <h2 className='h2'>challenges</h2>
                    {
                        userProfile.data.score.map((challenge, index) => {
                            return (
                                <div key={index}>
                                    <ul className='challenge-details'>
                                        <li className='theme-container'>Theme: {challenge.theme}</li>
                                        <li className='score'>Score: {challenge.score}</li>
                                        <li className='level'>Questions: {challenge.level}</li>
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>

            </div>}
            <div>
                <button className='update-button logout-button' onClick={() => {
                    const isLogin = window.confirm('You are going to log out');
                    if (isLogin) {
                        window.location.replace('../');
                    }
                }}>Log out</button>
            </div>
        </div>
    );
}

export default Account
