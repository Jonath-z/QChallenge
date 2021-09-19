import { useState,useEffect,useRef} from "react";
import Header from "./Header";
import Gamespace from "./GameSpace";
import Chat from "./chat/Chat";
import { FiMenu } from "react-icons/fi"
import { IoMdSend } from 'react-icons/io';
import { FaArrowCircleLeft } from 'react-icons/fa';
import TextareaAutosize from "react-textarea-autosize";
import DiscutionIcon from "./Discution";
import './chat/DiscussionWindow.css';
// import DiscussionWindow from "./chat/DiscussionWindow";
import CryptoJS from "crypto-js";
import io from "socket.io-client";

const socket = io('http://localhost:5050');
const localSearch = window.location.search;
const userID = localSearch.replace('?id=', '');
const textarea = document.querySelector('.input-container-textarea');
const messageDiscussionContainer = document.querySelector('.message-discution-container');

// const localSearch = window.location.search;
// const userID = localSearch.replace('?id=', '');

const getCryptedMessages = localStorage.getItem('messages');
const decryptMessage = JSON.parse(CryptoJS.AES.decrypt(getCryptedMessages, 'QChallenge001').toString(CryptoJS.enc.Utf8));

const Index = () => {
    const [closeDiscussionWindow, setCloseDiscussionWindow] = useState(false);
    const [openDiscution, setOpendiscution] = useState(false);
    const [message, setMessage] = useState(null);
    const newMessage= useRef(null);
    const allUsers = useRef();
    const receiverID = useRef();
    const reciverPseudo = useRef();
    const receiverAvatar = useRef();
    const allMessages = useRef(decryptMessage);

    useEffect(() => {
        socket.on('connect', () => {
            console.log(socket.id);
            const socketID = socket.id;
            socket.emit('user-socket-id', ({ userID, socketID }));
             const userData = JSON.parse(localStorage.getItem('user'));
            userData.data.socketID = socketID;
            localStorage.setItem('user', JSON.stringify(userData));
            allUsers.current = JSON.parse(localStorage.getItem('allUsers'));
        });
    }, []);

    useEffect(() => {
        socket.on('receive-message', ({ message, senderID, receiver }) => {
            console.log(message, 'from', senderID, 'to', receiver);
        });
    }, []);

    const openChatWindow = ()=>{
        setOpendiscution(true);
    }
    const closeChatWindow = () => {
        setOpendiscution(false);
    }

    const close = () => {
        setCloseDiscussionWindow(false);
    }
    const outMessage = (outMessage) => {
        return <p className='outcome-message'>{outMessage}</p>
    }
    const sendMessage = () => {
        const senderID = userID;
        const receiver = receiverID.current;
        console.log(senderID, receiver);
        socket.emit('send-message', ({ message, senderID, receiverID }));
        newMessage.current = message;
        textarea.value = '';
        return outMessage(message);
    }
    return (
        <>
            <Header />
            <Gamespace />
            <DiscutionIcon
                openChatWindow={openChatWindow}
            />
            {openDiscution && <Chat
                closeChatWindow={closeChatWindow}
                openChat={(e) => {
                    // console.log(e.target.innerText);
                    reciverPseudo.current = e.target.innerText;
                    const receiver = allUsers.current.find(data => data.pseudo === e.target.innerText);
                    // console.log(receiver);
                    receiverID.current = receiver.id;
                    receiverAvatar.current = receiver.avatar;
                    setCloseDiscussionWindow(true);
                }}
            />}
            {/* {closeDiscussionWindow && <DiscussionWindow
                receiverAvatar={receiverAvatar.current}
                receiverPseudo={reciverPseudo.current}
                closeDiscussionWindow={close}
                getMessage={(e) => {
                    const messageForSending = e.target.value;
                    setMessage(messageForSending);
                }}
                sendMessage={sendMessage}
                outMessage={<p className='outcome-message'>hi</p>}
            />} */}
            <div className='discussion-window'>
                <div className='receiver-details'>
                    <div className='receiver-details-profile'>
                        <FaArrowCircleLeft onClick={close} className='faArrow-left' />
                        <img src={receiverAvatar.current} alt='image' className='receiver-details-profile-avatar' />
                        <p className='receiver-details-profile-pseudo'>{reciverPseudo.current}</p>
                    </div>
                    < FiMenu className='receiver-details-icon' />
                </div>
                <div className='message-container'>

                    {
                        allMessages.current.map((message) => {
                            if (message.sender === userID) {
                                return <p className="outcome-message" style={{
                                    float: 'right',
                                    background: 'red'
                                }}>{message.message}</p>
                            }
                            else {
                                return <p className='income-message' style={{
                                    float: 'left',
                                    background: 'green'
                                }}>{message.message}</p>
                            }
                        })
                    }
                    {sendMessage}
                </div>
                <div className='input-container'>
                    <div>
                        <TextareaAutosize placeholder='message...' className='input-container-textarea' onChange={(e) => {
                            setMessage(e.target.value);
                        }} />
                    </div>
                    <IoMdSend className='input-container-send-incon' onClick={sendMessage} />
                </div>
            </div>
        </>
    );
}

export default Index
