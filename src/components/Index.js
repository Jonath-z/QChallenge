import { useState,useEffect,useRef} from "react";
import Header from "./Header";
import Gamespace from "./GameSpace";
import Chat from "./chat/Chat";
import DiscutionIcon from "./Discution";
import DiscussionWindow from "./chat/DiscussionWindow";
import io from "socket.io-client";

const socket = io('http://localhost:5050');
const localSearch = window.location.search;
const userID = localSearch.replace('?id=', '');

const Index = () => {
    const [closeDiscussionWindow, setCloseDiscussionWindow] = useState(false);
    const [openDiscution, setOpendiscution] = useState(false);
    const [message, setMessage] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const allUsers = useRef();
    const receiverID = useRef();
    const reciverPseudo = useRef();
    const receiverAvatar = useRef();

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
    const sendMessage = () => {
        const senderID = userID;
        const receiver = receiverID.current;
        console.log(senderID, receiver);

        socket.emit('send-message', ({ message, senderID, receiverID }));;
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
                    console.log(e.target.innerText);
                    reciverPseudo.current = e.target.innerText;
                    const receiver = allUsers.current.find(data => data.pseudo === e.target.innerText);
                    // console.log(receiver);
                    receiverID.current = receiver.id;
                    receiverAvatar.current = receiver.avatar;
                    setCloseDiscussionWindow(true);
                }}
            />}
            { closeDiscussionWindow && <DiscussionWindow
                receiverAvatar={receiverAvatar.current}
                receiverPseudo={reciverPseudo.current}
                closeDiscussionWindow={close}
                getMessage={(e) => {
                    const messageForSending = e.target.value;
                    setMessage(messageForSending);
                }}
                sendMessage={sendMessage}
                incomeMessage={() => {
                    return 
                }}
                // messages={
                //     allMessages.current.map((message) => {
                //         if (message.sender === userID) {
                //             return <p className="outcome-message" style={{
                //                 float: 'right',
                //                 background: 'red'
                //             }}>{ message.message}</p>
                //         }
                //         else if (message.sender === receiverID.current) {
                //             return <p className='income-message' style={{
                //                 float: 'left',
                //                 background:'green'
                //             }}>{ message.message}</p>
                //         }
                //     })
                // }
            />}

        </>
    )
}

export default Index
