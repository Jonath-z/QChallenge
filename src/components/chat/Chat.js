import { useState,useEffect,useRef} from 'react';
import './Chat.css';
import { FaArrowCircleRight } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import CryptoJS from 'crypto-js';
const currentUser = window.location.search

const Chat = (props) => {
    const [users, setUsers] = useState(null);
    const userID = useRef();
    userID.current = currentUser.replace('?id=', '');
    useEffect(() => {
        const decryptUsers = async () => {
            const usersDecrypted = CryptoJS.AES.decrypt(localStorage.getItem('allUsers'), 'QChallenge001').toString(CryptoJS.enc.Utf8);
            const usersFormated = JSON.parse(usersDecrypted);
            const usersFormatedFiltered = usersFormated.filter(({ id }) => id !== userID.current);
            setUsers(usersFormatedFiltered);
            console.log('user for discution', usersFormated)
        }
        decryptUsers();
    }, []);    
    return (
        <>
            <div className='chat-div-container'>
                <FaArrowCircleRight className='arrowRight' onClick={props.closeChatWindow} />
                <div className='chat-user-div-container'>
                    {
                        users === null ? <div className='chat-user-div-container' >
                            <Skeleton />
                        </div> : users.map((user) => {
                            return (
                                <div className='chat-user-div' key={user.id}>
                                    <p>{<img src={user.avatar} className='userAvatar' alt='profile' /> || <Skeleton />}</p>
                                    <div className='pseudo-Container' onClick={props.openChat}>
                                        <p className="pseudo">{user.pseudo}</p>
                                        {props.status === user.id && <p className='online-status'>online</p>}
                                    </div>
                                </div>
                            )
                       
                        })
                    }

                </div>
            </div >
        </>
    );
}

export default Chat
