import { useState,useEffect,useRef } from 'react';
import './Chat.css';
import { FaArrowCircleRight } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';


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
           window.localStorage.setItem('allUsers', JSON.stringify(usersFormatedFiltered));
            const allUsersFromLocalStorage = JSON.parse(localStorage.getItem('allUsers'));
            setUsers(allUsersFromLocalStorage);
            console.log('user for discution', usersFormated)
        }
        getUsers();
    }, []);
    // const closeWindow = () => {
    //     setKeyFrame(animationOut);
    // }
    
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
                                        {<p className="pseudo">{user.pseudo}</p> || <Skeleton />}
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
