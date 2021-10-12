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
import Research from "./Research";

const socket = io(`${process.env.REACT_APP_QCHALLENGE_API_URI}`);
const localSearch = window.location.search;
const userID = localSearch.replace('?id=', '');
const getCryptedMessages = localStorage.getItem('messages');
// var initialGetMessages;

toast.configure();
const CustomNotification = (props) => {
    return (
        <div>
            <p style={{ color: 'gray' }}>{props.sender}</p>
            <p style={{ color: 'black' }}>{props.message}</p>
        </div>
    );
}

const getUsers = async () => {
    const allUsers = await fetch(`${process.env.REACT_APP_QCHALLENGE_API_URI}/all-users`)
    const AllusersFormated = await allUsers.json();
    const allUsersCrypted = CryptoJS.AES.encrypt(JSON.stringify(AllusersFormated), `${process.env.REACT_APP_CRYPTO_KEY}`);
    window.localStorage.setItem('allUsers', allUsersCrypted);
    // const usersDecrypted = CryptoJS.AES.decrypt(localStorage.getItem('allUsers'), `${process.env.REACT_APP_CRYPTO_KEY}`).toString(CryptoJS.enc.Utf8);
    // const usersFormated = JSON.parse(usersDecrypted);
}
getUsers();

// const allUsersContex = React.createContext(null);

const Index = () => {
    const [closeDiscussionWindow, setCloseDiscussionWindow] = useState(false);
    const [openDiscution, setOpendiscution] = useState(false);
    const [status, setStatus] = useState({});
    const [message, setMessage] = useState(null);

    const newMessage = useRef(null);
    const receiverID = useRef();
    const reciverPseudo = useRef();
    const receiverAvatar = useRef();
    const [allMessages,setAllMessages] = useState();
    const [users] = useState(() => {
        const usersDecrypted = CryptoJS.AES.decrypt(localStorage.getItem('allUsers'), `${process.env.REACT_APP_CRYPTO_KEY}`).toString(CryptoJS.enc.Utf8);
        return JSON.parse(usersDecrypted);
    });
    const [newLeftDuelPosition, setNewLeftDuelPosition] = useState('unset');
    const [newRightDuelPostion, setNewRightDuelPosition] = useState('0');
    const [isDuel, setIsDuel] = useState(false);
    const [showDuelDetails, setShowDuelDetails] = useState(true);
    const [duelID, setDuelID] = useState();
    const [NewduelLevel, setNewDuelLevel] = useState();
    // const [newOnlineUser, setNewOnlineUser] = useState();
    // const [NewduelTheme, setNewDuelTheme] = useState();
    const [showDuelInputID, setShowDuelInputID] = useState(true);
    const [getDuelID, setGetDuelID] = useState();
    const [duelCreator, setDuelCreator] = useState();
    const [duelJoiner, setDuelJoiner] = useState();
    const [duelSettingReady, setDuelSettingReady] = useState(false);
    const [duelScore,setDuelScore] = useState(0);
    const [showStartButton, setShowStartButton] = useState(true);
    let [creatorScore, setCreatorScore] = useState(0);
    let [joinerScore, setJoinerScore] = useState(0);

    const [isSearch, setIsSearch] = useState();
    const [searchResult, setSearchResults] = useState('');
    const [searchResultPseudo, setSearchResultPseudo] = useState();
    const [searchResultProfile, setSearchResultProfile] = useState();
    useEffect(() => {
        const initialGetMessages = CryptoJS.AES.decrypt(getCryptedMessages, `${process.env.REACT_APP_CRYPTO_KEY}`).toString(CryptoJS.enc.Utf8);
        setAllMessages(JSON.parse(initialGetMessages));
    },[]);
    // **************************SOCKET IO CONNECTION ***********************************//
    useEffect(() => {
        socket.on('connect', () => {
            // console.log(socket.id);
            const socketID = socket.id;
            socket.emit('user-socket-id', ({ userID, socketID }));
            const userData = JSON.parse(localStorage.getItem('user'));
            userData.data.socketID = socketID;
            localStorage.setItem('user', JSON.stringify(userData));
        });
    }, []);
    useEffect(() => {
        if (navigator.onLine === true) {
            socket.emit('online', ({ userID }));
        }
    }, []);
    // ********************* LISTEN EACH SOCKET FROM SERVER ****************************//
    useEffect(() => {
        socket.on('online-user', ({ userID, status }) => {
            setStatus({ userID, status });
            // console.log('online-user', userID);
            // setNewOnlineUser(userID);
        });
        socket.on('receive-message', ({ message, senderID, receiver, senderPseudo, time }) => {
            const getNewArrayOfMessage = localStorage.getItem('messages');
            const decryptMessage = JSON.parse(CryptoJS.AES.decrypt(getNewArrayOfMessage, `${process.env.REACT_APP_CRYPTO_KEY}`).toString(CryptoJS.enc.Utf8));
            decryptMessage.push({
                id: `${Math.random(Math.floor() * 10)}`,
                message: message,
                sender: senderID,
                receiver: receiver,
                time: time
            });
            
            const encryptedMessages = CryptoJS.AES.encrypt(JSON.stringify(decryptMessage), `${process.env.REACT_APP_CRYPTO_KEY}`);
            localStorage.setItem('messages', encryptedMessages);
            const newDecription = localStorage.getItem('messages');
            setAllMessages(JSON.parse(CryptoJS.AES.decrypt(newDecription,`${process.env.REACT_APP_CRYPTO_KEY}`).toString(CryptoJS.enc.Utf8)));
            // console.log('from local storage', JSON.parse(CryptoJS.AES.decrypt(newDecription, `${process.env.REACT_APP_CRYPTO_KEY}`).toString(CryptoJS.enc.Utf8)));
            // console.log('decrypt message', decryptMessage);
            notify(message, senderPseudo);
            navigator.vibrate([200, 200]);
        });
        socket.on('request-join-duel', ({ joinDuelID, senderID, senderPseudo }) => {
            // console.log(joinDuelID, senderID, senderPseudo);
            const duelCreator = userID;
            if (joinDuelID === localStorage.getItem('duelID')) {
                const duelTheme = localStorage.getItem('duelTheme');
                const duelLevel = localStorage.getItem('duelLevel');
                socket.emit('true-duelID', ({ duelLevel, duelCreator, senderID, duelTheme }));
                localStorage.setItem('duel-gamer', JSON.stringify({ creator: duelCreator, joiner: senderID }));
                // console.log(duelTheme, duelLevel);
            }
            else {
                socket.emit('false-duelID', (senderID));
            }
        });
        socket.on('joined-duel', ({ duelLevel, senderID, duelCreator, duelTheme }) => {
            // console.log('level:', duelLevel, 'joiner:', senderID, 'duel creator', duelCreator);
            setShowDuelInputID(false);
            const creatorPseudo = users.find(({ id }) => id === duelCreator).pseudo;
            setDuelCreator(creatorPseudo);
            setNewDuelLevel(duelLevel);
            localStorage.setItem('joined-duel-level', duelLevel);
            localStorage.setItem('joined-duel-theme', duelTheme);
            localStorage.setItem('duel-gamer', JSON.stringify({ creator: duelCreator, joiner: senderID }));
            setDuelSettingReady(true);
            // console.log(duelTheme);
            setDuelJoiner(JSON.parse(localStorage.getItem('user')).data.pseudo);
            toast.success('You join the duel, set level to start', {
                position: toast.POSITION.TOP_CENTER
            });
            const joinerPseudo = JSON.parse(localStorage.getItem('user')).data.pseudo
            socket.emit('joiner', ({ joinerPseudo, duelCreator, duelLevel, duelTheme }));
            navigator.vibrate([200, 200]);
        });
        socket.on('join-duel-fail', (errorNotification) => {
            toast.error(`Duel ID not found,${errorNotification}`, {
                position: toast.POSITION.TOP_CENTER
            });
            navigator.vibrate([200, 200]);
        });
        socket.on('duel-joiner', ({ joinerPseudo, duelLevel, duelTheme }) => {
            setDuelJoiner(joinerPseudo);
            setDuelSettingReady(true);
            setShowDuelDetails(false);
            localStorage.setItem('joined-duel-level', duelLevel);
            localStorage.setItem('joined-duel-theme', duelTheme);
            // console.log('my joiner', joinerPseudo);
            toast.success(`${joinerPseudo} joined your duel,set level to start`, {
                position: toast.POSITION.TOP_CENTER
            });
            navigator.vibrate([200, 200]);
        });
        socket.on('duel-stoped', (stop) => {
            toast.info(stop, {
                position: toast.POSITION.TOP_CENTER
            });
            setNewLeftDuelPosition('unset');
            setNewRightDuelPosition('50px');
            setIsDuel(false);
            setShowDuelDetails(false);
            setShowDuelInputID(false);
            setDuelSettingReady(false);
            localStorage.removeItem('duel-gamer');
            localStorage.removeItem('duelID');
            // window.location.reload();
        });
        socket.on('duel-score-joiner', (duelScore) => {
            setJoinerScore(duelScore)
        });
        socket.on('duel-score-creator', (duelScore) => {
            setCreatorScore(duelScore);
        });
    }, [users]);

    const openChatWindow = () => {
        setOpendiscution(true);
    }
    const closeChatWindow = () => {
        setOpendiscution(false);
    }

    const close = () => {
        setCloseDiscussionWindow(false);
    }

    const notify = (message, sender) => {
        toast(<CustomNotification message={message} sender={sender} />, {
            autoClose: true
        });
    }
    const sendMessage = (e) => {
        e.preventDefault();
        const today = new Date();
        const time = `${today.getHours()}:${today.getMinutes()}`;
        const textarea = document.querySelector('.input-container-textarea');
        const senderID = userID;
        // const receiver = receiverID.current;
        // console.log(senderID, receiver);
        const senderPseudo = JSON.parse(localStorage.getItem('user')).data.pseudo;
        // console.log(message);
        socket.emit('send-message', ({ message, senderID, receiverID, senderPseudo, time }));
        newMessage.current = message;
        const getNewArray = localStorage.getItem('messages');
        const decryptMessage = JSON.parse(CryptoJS.AES.decrypt(getNewArray, `${process.env.REACT_APP_CRYPTO_KEY}`).toString(CryptoJS.enc.Utf8));
        decryptMessage.push({
            id: Math.random(Math.floor() * 10),
            message: message,
            sender: senderID,
            receiver: receiverID.current,
            time:time
        })
        
        const encryptedMessages = CryptoJS.AES.encrypt(JSON.stringify(decryptMessage), `${process.env.REACT_APP_CRYPTO_KEY}`);
        localStorage.setItem('messages', encryptedMessages);
        const newDecription = localStorage.getItem('messages');
        setAllMessages(JSON.parse(CryptoJS.AES.decrypt(newDecription, `${process.env.REACT_APP_CRYPTO_KEY}`).toString(CryptoJS.enc.Utf8)));
        // console.log(JSON.parse(CryptoJS.AES.decrypt(newDecription, `${process.env.REACT_APP_CRYPTO_KEY}`).toString(CryptoJS.enc.Utf8)));
        textarea.value = '';
    }
    const openDuel = (e) => {
        if (e.target.innerHTML === 'Create the duel') {
            setIsDuel(true);
            setShowDuelDetails(true);
            setShowDuelInputID(false);
            setNewLeftDuelPosition('100px');
            setNewRightDuelPosition('unset');
            setShowStartButton(false);
            setDuelJoiner('');
            const uniqueDuelID = uuid();
            setDuelID(uniqueDuelID);
            localStorage.setItem('duelID', uniqueDuelID);
            setDuelCreator(JSON.parse(localStorage.getItem('user')).data.pseudo);
        }
        if (e.target.innerHTML === 'Join the duel') {
            setIsDuel(true);
            setShowDuelDetails(false);
            setShowDuelInputID(true);
            setNewLeftDuelPosition('100px');
            setNewRightDuelPosition('unset');
            setShowStartButton(false);
            setDuelCreator('');
        }
    }
    const showDuelDetailsHandler = () => {
        setShowDuelDetails(false);
    }
    const joinTheDuel = (e) => {
        e.preventDefault();
        const senderID = userID;
        const receiver = receiverID.current;
        // console.log(senderID, receiver);
        const senderPseudo = JSON.parse(localStorage.getItem('user')).data.pseudo;
        socket.emit('join-duel', ({ getDuelID, senderID, receiver, senderPseudo }));
        // console.log(getDuelID);
    }
    const startTheDuel = () => {
        // console.log('creator', duelCreator, 'joiner', duelJoiner);
    }
    const stopDuel = () => {
        localStorage.removeItem('duel-gamer');
        localStorage.removeItem('duelID');
        setShowStartButton(true);
        setIsDuel(false);
        if (duelJoiner !== undefined) {
            const duelStoperObj = users.find(({ pseudo }) => pseudo === duelJoiner);
            if (duelStoperObj !== undefined) { const duelStoper = duelStoperObj.pseudo; socket.emit('stop-duel', (duelStoper)) };
            setNewLeftDuelPosition('unset');
            setNewRightDuelPosition('50px');
            setShowDuelDetails(false);
            setShowDuelInputID(false);
            setDuelSettingReady(false);
            // console.log(duelStoperObj);
        }
        if (duelCreator !== undefined) {
            const duelStoperObj = users.find(({ pseudo }) => pseudo === duelCreator);
            if (duelStoperObj !== undefined) { const duelStoper = duelStoperObj.pseudo; socket.emit('stop-duel', (duelStoper)) };
            setNewLeftDuelPosition('unset');
            setNewRightDuelPosition('50px');
            setShowDuelDetails(false);
            setShowDuelInputID(false);
            setDuelSettingReady(false);
            // console.log(duelStoperObj);
        }
        else {
            window.location.reload();
        }
    }
    const sendDuelScore = (duelScore) => {
        const currentGamer = window.location.search.replace('?id=', '');
        const duelCreator = JSON.parse(localStorage.getItem('duel-gamer')).creator;
        const duelJoiner = JSON.parse(localStorage.getItem('duel-gamer')).joiner;
        if (currentGamer === duelCreator) {
            socket.emit('score-to-joiner', ({ duelJoiner, duelScore }));
            // setCreatorScore(duelScore);
            setJoinerScore(duelScore);
        }
        if (currentGamer === duelJoiner) {
            socket.emit('score-to-creator', ({ duelCreator, duelScore }));
            // setJoinerScore(duelScore);
            setCreatorScore(duelScore);
        }
    }
    return (
        <>
            {/* <allUsersContex.Provider value={getUsers()}> */}
            <Header
                openDuel={openDuel}
                setIsResearch={setIsSearch}
                setSearchInputValue={setSearchResults}
                searchClosed={isSearch}
                isGameDuel={isDuel}
            />
           {isDuel && showDuelDetails && !isSearch &&<DuelDetails
                duelID={duelID}
                duelLevel={localStorage.getItem('duelLevel')}
                showDuelDetails={showDuelDetailsHandler}
                copyDuelID={() => {
                    navigator.clipboard.writeText(duelID);
                    toast.success('ID copied');
                }}
            />}
            {
                isDuel && !isSearch && <DuelPanel
                    duelLevel={NewduelLevel}
                    duelCreatorPseudo={duelCreator}
                    duelJoinerPseudo={duelJoiner}
                    duelCreatorScore={creatorScore}
                    duelJoinerScore={joinerScore}
                    showDuelDetails={() => {
                        if (duelID) {
                            setShowDuelDetails(true);
                        } else {
                            setShowDuelInputID(true);
                        }
                    }}
                    stopDuel={stopDuel}
                    scoreK={duelScore} // variable not used(just to remove the warning)
                />
            }
            {
                isDuel && showDuelInputID && !isSearch && <InputDuelID
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
                    duelSettingReady={duelSettingReady}
                    NewLeftPosition={newLeftDuelPosition}
                    NewRightPosition={newRightDuelPostion}
                    startTheDuel={startTheDuel}
                    showStartButton={showStartButton}
                    setShowStartButton={setShowStartButton}
                    duelScoreForSending={setDuelScore}
                sendScore={sendDuelScore}
                research={isSearch}
                />
            {  <DiscutionIcon
                openChatWindow={openChatWindow}
            />}

            {openDiscution && <Chat
                closeChatWindow={closeChatWindow}
                openChat={(e) => {
                    const getMessages = CryptoJS.AES.decrypt(getCryptedMessages, `${process.env.REACT_APP_CRYPTO_KEY}`).toString(CryptoJS.enc.Utf8);
                    setAllMessages(JSON.parse(getMessages));
                    // console.log(JSON.parse(getMessages).length);
                    reciverPseudo.current = e.target.innerText;
                    const receiver = users.find(data => data.pseudo === reciverPseudo.current);
                    // console.log(receiver, 'in', allUsers.current, 'with name:', reciverPseudo.current);
                    // console.log(receiver, reciverPseudo.current);
                    receiverID.current = receiver.id;
                    receiverAvatar.current = receiver.avatar;
                    setCloseDiscussionWindow(true);
                }}
                status={status}
                searchResult={isSearch}
                searchResultProfile={searchResultProfile}
                searchResultPseudo={searchResultPseudo}
            />}
            {closeDiscussionWindow &&  <DiscussionWindow
                receiverAvatar={receiverAvatar.current}
                receiverPseudo={reciverPseudo.current}
                receiverID={receiverID.current}
                senderID = {userID}
                closeDiscussionWindow={close}
                getMessage={(e) => {
                    const messageForSending = e.target.value;
                    setMessage(messageForSending);
                    // console.log('allMessage', allMessages);
                }}
                sendMessage={sendMessage}
                allMessages={JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('messages'), `${process.env.REACT_APP_CRYPTO_KEY}`).toString(CryptoJS.enc.Utf8))}
                // allMessages={allMessages}
                setNewMessages={setAllMessages}
                messageK = {allMessages} // variable not used (just to remove the warning)
            />}
            {
                isSearch && <Research
                    result={searchResult}
                    closeResearch={setIsSearch}
                    goToChatUserPseudo={setSearchResultPseudo}
                    goToChatUserProfile={setSearchResultProfile}
                    openNewChat={openChatWindow}
                />
            }
        </>
    );
}

export default Index
