import React, { useState, useEffect, useRef } from "react";
import {toast}  from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from "socket.io-client";
import CryptoJS from "crypto-js";
import uuid from 'react-uuid';
import Header from "./Header";
import Gamespace from "./GameSpace";
import Chat from "./chat/Chat";
import DiscutionIcon from "./Discution";
import './chat/DiscussionWindow.css';
import './Notification.css';
import DiscussionWindow from "./chat/DiscussionWindow";
import DuelDetails from "./duelComponent/DuelDetails";
import ScoreBar from "./ScoreBar";

const socket = io('http://localhost:5050');
const localSearch = window.location.search;
const userID = localSearch.replace('?id=', '');
const getCryptedMessages = localStorage.getItem('messages');
const initialGetMessages = CryptoJS.AES.decrypt(getCryptedMessages, 'QChallenge001').toString(CryptoJS.enc.Utf8);
const formatedInitalsMessages = JSON.parse(initialGetMessages);


toast.configure();
const CustomNotification = (props) => {
    return (
        <div>
            <p style={{ color: 'black' }}>{props.sender}</p>
            <p>{props.message}</p>
       </div>
    )
}

const Index = () => {
    const [closeDiscussionWindow, setCloseDiscussionWindow] = useState(false);
    const [openDiscution, setOpendiscution] = useState(false);
    const [message, setMessage] = useState(null);
    const [isDuel, setIsDuel] = useState(false);
    const [newLeftDuelPosition, setNewLeftDuelPosition] = useState('unset');
    const [newRightDuelPostion, setNewRightDuelPosition] = useState('0');
    const [showDuelDetails, setShowDuelDetails] = useState(true);
    const [duelID, setDuelID] = useState('Medium');
    const newMessage= useRef(null);
    const allUsers = useRef(JSON.parse(localStorage.getItem('allUsers')));
    const receiverID = useRef();
    const reciverPseudo = useRef();
    const receiverAvatar = useRef();
    const [allMessages, setAllMessages] = useState(formatedInitalsMessages);

    useEffect(() => {
        socket.on('connect', () => {
            console.log(socket.id);
            const socketID = socket.id;
            socket.emit('user-socket-id', ({ userID, socketID }));
             const userData = JSON.parse(localStorage.getItem('user'));
            userData.data.socketID = socketID;
            localStorage.setItem('user', JSON.stringify(userData));
        });
    }, []);

    useEffect(() => {
        socket.on('receive-message', ({ message, senderID, receiver,senderPseudo }) => {
            const getNewArrayOfMessage = localStorage.getItem('messages');
            const decryptMessage = JSON.parse(CryptoJS.AES.decrypt(getNewArrayOfMessage, 'QChallenge001').toString(CryptoJS.enc.Utf8));
            decryptMessage.push({
                id: `${Math.random(Math.floor() * 10)}`,
                message: message,
                sender: senderID,
                receiver: receiver
            })
            
            const encryptedMessages = CryptoJS.AES.encrypt(JSON.stringify(decryptMessage), 'QChallenge001');
            localStorage.setItem('messages', encryptedMessages);
            const newDecription = localStorage.getItem('messages');
            setAllMessages(JSON.parse(CryptoJS.AES.decrypt(newDecription, 'QChallenge001').toString(CryptoJS.enc.Utf8)));
            console.log('from local storage',JSON.parse(CryptoJS.AES.decrypt(newDecription, 'QChallenge001').toString(CryptoJS.enc.Utf8)));
            console.log('decrypt message', decryptMessage);
            notify(message, senderPseudo);
            navigator.vibrate([200, 200]);
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

    const notify = (message,sender) => {
        toast(<CustomNotification message={message} sender={sender} />, {
            autoClose: true
        });
    }
    const sendMessage = (e) => {
        e.preventDefault();
        const textarea = document.querySelector('.input-container-textarea')
        const senderID = userID;
        const receiver = receiverID.current;
        console.log(senderID, receiver);
        const senderPseudo = JSON.parse(localStorage.getItem('user')).data.pseudo;
        socket.emit('send-message', ({ message, senderID, receiverID,senderPseudo }));
        newMessage.current = message;
        const getNewArray = localStorage.getItem('messages');
        const decryptMessage = JSON.parse(CryptoJS.AES.decrypt(getNewArray, 'QChallenge001').toString(CryptoJS.enc.Utf8));
        decryptMessage.push({
            id: Math.random(Math.floor() * 10),
            message: message,
            sender: senderID,
            receiver: receiverID.current
        })
        
       const encryptedMessages = CryptoJS.AES.encrypt(JSON.stringify(decryptMessage), 'QChallenge001');
        localStorage.setItem('messages', encryptedMessages);
        const newDecription = localStorage.getItem('messages'); 
        setAllMessages(JSON.parse(CryptoJS.AES.decrypt(newDecription, 'QChallenge001').toString(CryptoJS.enc.Utf8)));
        console.log(JSON.parse(CryptoJS.AES.decrypt(newDecription, 'QChallenge001').toString(CryptoJS.enc.Utf8)));
        textarea.value = '';
    }
    const openDuel = (e) => {
        if (e.target.innerHTML == 'Create the duel') {
            setIsDuel(true);
            setNewLeftDuelPosition('100px');
            setNewRightDuelPosition('unset');
            const duelID = uuid();
            setDuelID(duelID);
        }
        if (e.target.innerHTML == 'Join the duel') {
            setIsDuel(true);
            setNewLeftDuelPosition('100px');
            setNewRightDuelPosition('unset');
        }
    }
    const showDuelDetailsHandler = () => {
        setShowDuelDetails(false);
    }

    return (
        <>
            <Header
                openDuel={openDuel}         
            />
            {isDuel && showDuelDetails && <DuelDetails
                duelID={duelID}
                showDuelDetails={showDuelDetailsHandler}
                copyDuelID={() => {
                    navigator.clipboard.writeText(duelID);
                    toast.success('ID copied');
                }}
            />}
            <Gamespace
                isGameDuel={isDuel}
                NewLeftPosition={newLeftDuelPosition }
                NewRightPosition={newRightDuelPostion}
            />
            <DiscutionIcon
                openChatWindow={openChatWindow}
            />
            {openDiscution && <Chat
                closeChatWindow={closeChatWindow}
                openChat={(e) => {
                    // console.log(e.target.innerText);
                    reciverPseudo.current = e.target.innerText;
                    const receiver = JSON.parse(localStorage.getItem('allUsers')).find(data => data.pseudo === reciverPseudo.current);
                    // console.log(receiver, 'in', allUsers.current, 'with name:', reciverPseudo.current);
                    receiverID.current = receiver.id;
                    receiverAvatar.current = receiver.avatar;
                    // console.log('allMessage', allMessages);
                    setCloseDiscussionWindow(true);
                }}
            />}
            {closeDiscussionWindow && <DiscussionWindow
                receiverAvatar={receiverAvatar.current}
                receiverPseudo={reciverPseudo.current}
                closeDiscussionWindow={close}
                getMessage={(e) => {
                    const messageForSending = e.target.value;
                    setMessage(messageForSending);
                    // console.log('allMessage', allMessages);
                }}
                sendMessage={sendMessage}
                allMessages={allMessages}
            />}
        </>
    );
}

export default Index
