import { useState,useEffect,useRef } from 'react';
import './Chat.css';
import { FaArrowCircleLeft } from 'react-icons/fa';
import CryptoJS from 'crypto-js';


const currentUser = window.location.search

const Chat = (props) => {
    const [users, setUsers] = useState(null);
    const userID = useRef();
    userID.current = currentUser.replace('?id=', '');
    useEffect(() => {
        const getUsers = async () => {
            const allUsers = await fetch('../all-users')
            const usersFormated = await allUsers.json();
           const usersFormatedFiltered = usersFormated.filter(({ id }) => id !== userID.current);
            setUsers(usersFormatedFiltered);
            window.localStorage.setItem('allUsers', JSON.stringify(usersFormatedFiltered));
            console.log('user for discution', usersFormated)
        }
        getUsers();
    }, []);
    useEffect(() => {
        const getMessages = async () => {
            const allMessages = await fetch('../all-messages');
            const formatedMessages = await allMessages.json();
            const encryptMessages = CryptoJS.AES.encrypt(JSON.stringify(formatedMessages),'QChallenge001');
            localStorage.setItem('messages', encryptMessages);
        }
        getMessages();
    },[])
    
    return (
        <div className='chat-div-container'>
                <FaArrowCircleLeft className='arrowRight' onClick={props.closeChatWindow} />

            {
               users !== null && users.map((user) => {
                 return (
                       <div key={user.id}>
                           <div className='chat-user-div'>
                               <p><img src={user.avatar} className='userAvatar' alt='image' /></p>
                               <div className='pseudo-Container' onClick={props.openChat}>
                                   <p className="pseudo">{user.pseudo}</p>
                               </div>
                           </div>
                       </div>
                   )
                       
                })
            }
        </div >
    );
}

export default Chat
