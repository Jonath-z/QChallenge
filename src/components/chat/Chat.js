import { useState,useEffect,useRef } from 'react';
import './Chat.css';
import { FaArrowCircleRight } from 'react-icons/fa';
// import CryptoJS from 'crypto-js';


const currentUser = window.location.search
// const animationOut = `keyframes 0%{
//     width: 20%;
// }
// 25%{
//     width: 15%;
// }
// 50%{
//     width: 10%;
// }
// 75%{
//     width: 5%;
// }
// 100%{
//     width: 1%;
// } 300ms easy-out`;
const Chat = (props) => {
    const [users, setUsers] = useState(null);
    const userID = useRef();
    userID.current = currentUser.replace('?id=', '');
    // const [keyFramme, setKeyFrame] = useState('');
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
    // const closeWindow = () => {
    //     setKeyFrame(animationOut);
    // }
    
    return (
        <>
            <div className='chat-div-container'>
                <FaArrowCircleRight className='arrowRight' onClick={props.closeChatWindow} />
                <div className='chat-user-div-container'>

                    {
                        users !== null && users.map((user) => {
                            return (
                                // <div key={user.id} >
                                <div className='chat-user-div' key={user.id}>
                                    <p><img src={user.avatar} className='userAvatar' alt='profile' /></p>
                                    <div className='pseudo-Container' onClick={props.openChat}>
                                        <p className="pseudo">{user.pseudo}</p>
                                    </div>
                                </div>
                                // </div>
                            )
                       
                        })
                    }
                </div>
            </div >
        </>
    );
}

export default Chat
