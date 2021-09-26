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
import InputDuelID from "./duelComponent/InputDuelID";
import DuelPanel from "./duelComponent/DuelPanel";

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
    const newMessage= useRef(null);
    const allUsers = useRef(JSON.parse(localStorage.getItem('allUsers')));
    const receiverID = useRef();
    const reciverPseudo = useRef();
    const receiverAvatar = useRef();
    const [allMessages, setAllMessages] = useState(formatedInitalsMessages);
    const [showDuelDetails, setShowDuelDetails] = useState(true);
    const [duelID, setDuelID] = useState();
    const [duelLevel, setDuelLevel] = useState('Medium');
    const [showDuelInputID, setShowDuelInputID] = useState(true);
    const [getDuelID, setGetDuelID] = useState();
    const [duelCreator, setDuelCreator] = useState();
    const [duelJoiner, setDuelJoiner] = useState();

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
        socket.on('request-join-duel', ({ joinDuelID, senderID, senderPseudo }) => {
            console.log(joinDuelID, senderID, senderPseudo);
            const duelCreator = userID;
            if (joinDuelID === localStorage.getItem('duelID')) {
                console.log(joinDuelID, 'and', localStorage.getItem('duelID'));
                socket.emit('true-duelID', ({ duelLevel, duelCreator, senderID }));
            }
            else {
                console.log(joinDuelID, 'and', duelID);
                socket.emit('false-duelID', (senderID));
            }          
        });
        socket.on('joined-duel', ({ duelLevel, senderID, duelCreator }) => {
            console.log('level:', duelLevel, 'joiner:', senderID, 'duel creator', duelCreator);
            setShowDuelInputID(false);
            setDuelLevel(duelLevel);
            const creatorPseudo = JSON.parse(localStorage.getItem('allUsers')).find(({ id }) => id == duelCreator).pseudo;
            setDuelCreator(creatorPseudo);
            setDuelJoiner(JSON.parse(localStorage.getItem('user')).data.pseudo);
            toast.success( 'You join the duel', {
                position: toast.POSITION.TOP_CENTER
            });
            const joinerPseudo = JSON.parse(localStorage.getItem('user')).data.pseudo
            socket.emit('joiner', ({joinerPseudo , duelCreator }));
        });
        socket.on('join-duel-fail', (errorNotification) => {
            toast.error(`Duel ID not found,${errorNotification}`, {
                position: toast.POSITION.TOP_CENTER
            });
        });
        socket.on('duel-joiner', (joinerPseudo) => {
            setDuelJoiner(joinerPseudo);
            setShowDuelDetails(false);
            console.log('my joiner', joinerPseudo);
            toast.success( `${joinerPseudo} joined your duel`, {
                position: toast.POSITION.TOP_CENTER
            });
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
            setShowDuelInputID(false);
            setNewLeftDuelPosition('100px');
            setNewRightDuelPosition('unset');
            const uniqueDuelID = uuid();
            setDuelID(uniqueDuelID);
            localStorage.setItem('duelID', uniqueDuelID);
            setDuelCreator( JSON.parse(localStorage.getItem('user')).data.pseudo);
        }
        if (e.target.innerHTML == 'Join the duel') {
            setIsDuel(true);
            setShowDuelDetails(false);
            setNewLeftDuelPosition('100px');
            setNewRightDuelPosition('unset');
        }
    }
    const showDuelDetailsHandler = () => {
        setShowDuelDetails(false);
    }

    const joinTheDuel = (e) => {
        e.preventDefault();
        const senderID = userID;
        const receiver = receiverID.current;
        console.log(senderID, receiver);
        const senderPseudo = JSON.parse(localStorage.getItem('user')).data.pseudo;
        socket.emit('join-duel', ({ getDuelID, senderID, receiver, senderPseudo }));
        // console.log(getDuelID);
    }
    return (
        <>
            <Header
                openDuel={openDuel}
            />
            {isDuel && showDuelDetails && <DuelDetails
                duelID={duelID}
                duelLevel={duelLevel}
                showDuelDetails={showDuelDetailsHandler}
                copyDuelID={() => {
                    navigator.clipboard.writeText(duelID);
                    toast.success('ID copied');
                }}
            />}
            {
                isDuel && <DuelPanel
                duelLevel={duelLevel}
                    duelCreatorPseudo={duelCreator}
                    duelJoinerPseudo={duelJoiner}
                    duelCreatorScore={0}
                    duelJoinerScore={0}
                />
            }
            {
                isDuel && showDuelInputID && <InputDuelID
                    getDuelIDFromJoiner={(e) => {
                        setGetDuelID(e.target.value);
                    }}
                    joinTheDuel={joinTheDuel}
                    showDuelInputID={() => {
                        setShowDuelInputID(false);
                    }}
                />
            }
            <Gamespace
                isGameDuel={isDuel}
                NewLeftPosition={newLeftDuelPosition}
                NewRightPosition={newRightDuelPostion}
                setDuelLevel={setDuelLevel}
            />
            <DiscutionIcon
                openChatWindow={openChatWindow}
            />
            {openDiscution && <Chat
                closeChatWindow={closeChatWindow}
                openChat={(e) => {
                    reciverPseudo.current = e.target.innerText;
                    const receiver = JSON.parse(localStorage.getItem('allUsers')).find(data => data.pseudo === reciverPseudo.current);
                    // console.log(receiver, 'in', allUsers.current, 'with name:', reciverPseudo.current);
                    receiverID.current = receiver.id;
                    receiverAvatar.current = receiver.avatar;
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
