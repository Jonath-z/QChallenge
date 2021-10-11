import './Research.css';
import { useState} from 'react';
import { MdCancel } from 'react-icons/md';
import { RiMessage3Fill } from 'react-icons/ri';
import Profile from './profile/Profile';
import CryptoJS from 'crypto-js';

let userScoreData;
const userID = window.location.search.replace('?id=', '');

const Research = (props) => {
    const [showProfile, setShwoProfile] = useState(false);
    const [userSearchedAvatar, setUserSearchedAvatar] = useState();

    const closeIsResearch = () => {
        props.closeResearch(false);
        userScoreData = undefined;
    }
    const goToUserProfile = (e) => {
        console.log(e.target);
        const userProfileUrl = e.target.src;
        const userPseudo = e.target.nextSibling.innerHTML;
        const allUsers = JSON.parse(
            CryptoJS.AES.decrypt(
                localStorage.getItem('allUsers'), `${process.env.REACT_APP_CRYPTO_KEY}`)
                .toString(CryptoJS.enc.Utf8)
        );
        const user = allUsers.filter(({ pseudo, avatar }) => pseudo === userPseudo && avatar === userProfileUrl);
        userScoreData = user[0].score
        setUserSearchedAvatar(userProfileUrl);
        setShwoProfile(true);
        if (showProfile) {
            setShwoProfile(false);
        }
    }

    const goToChat = (e) => {
        console.log(e.target.parentNode.parentNode);
        const userProfileUrl = e.target.parentNode.parentNode.previousSibling.previousSibling.src;
        const userPseudo = e.target.parentNode.parentNode.previousSibling.innerHTML;
        props.goToChatUserPseudo(userPseudo)
        props.goToChatUserProfile(userProfileUrl);
        console.log(userProfileUrl, userPseudo);
    }
    
    const getAllUsers = () => {
        const allUsers = JSON.parse(
            CryptoJS.AES.decrypt(
                localStorage.getItem('allUsers'), `${process.env.REACT_APP_CRYPTO_KEY}`)
                .toString(CryptoJS.enc.Utf8)
        ).filter(({ id }) => id !== userID);

        return (
            allUsers.map((user, index) => {
                return (
                    <div key={index} className='resultContainer'>
                        <img src={user.avatar} style={{
                            width: '50px',
                            borderRadius: '50%',
                            border: '2px solid rgb(172, 174, 246)'
                        }}
                            alt=''
                            className='user-profile'
                            onClick={goToUserProfile}
                        />
                        <p className='user-pseudo'>{user.pseudo}</p>
    
                        <RiMessage3Fill className='message-icon'
                            onClick={(e) => {
                                goToChat(e);
                                props.openNewChat();
                            }}
                        />

                    </div>
                )
            })
        )

    }

    const searchInUserList = () => {
        let searchInputValue = props.result;
        let searchFilter = searchInputValue.toUpperCase();
        let userList = document.querySelectorAll('.resultContainer');
        // console.log(userList);
        // console.log(searchFilter);  
        for (let i = 0; i < userList.length; i++) {
            let user = userList[i].getElementsByTagName('p')[0];
            // console.log(i);
            let userPseudo = user.textContent || user.innerText;
            if (userPseudo.toUpperCase().indexOf(searchFilter) > -1) {
                userList[i].style.display = 'flex';
            } else {
                userList[i].style.display = 'none';
            }
        }
    }
    searchInUserList();

    return (
        <>
            <div className='research' onClick={() => {
                if (showProfile) {
                    setShwoProfile(false);
                }
            }}>
                <div className='cancel'><MdCancel className='cancel' onClick={closeIsResearch} /></div>
                {
                    getAllUsers()
                }
            </div>
            {showProfile && <Profile
                userScore={userScoreData}
                avatar={userSearchedAvatar}
                stillShowingUserProfileDetails={() => {
                    setShwoProfile(true);
                }}
                
            />}
        </>
    );
}

export default Research
