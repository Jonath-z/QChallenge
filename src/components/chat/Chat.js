import { useState,useEffect } from 'react';
import './Chat.css';
import { FaArrowCircleLeft } from 'react-icons/fa';

const Chat = (props) => {
    const [users, setUsers] = useState(null);
    useEffect(() => {
        const getUsers = async () => {
            const allUsers = await fetch('../all-users')
            const usersFormated = await allUsers.json();
            setUsers(usersFormated);
            window.localStorage.setItem('allUsers', JSON.stringify(usersFormated));
            console.log('user for discution',usersFormated)
        }
        getUsers();
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
