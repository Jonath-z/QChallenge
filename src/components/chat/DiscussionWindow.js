import { FiMenu } from "react-icons/fi"
import { IoMdSend } from 'react-icons/io';
import { FaArrowCircleLeft } from 'react-icons/fa';
import TextareaAutosize from "react-textarea-autosize";
import { useState} from "react";
import ScrollableFeed from 'react-scrollable-feed'
import './DiscussionWindow.css';
import { useLongPress } from 'use-long-press';
import { FaTrash } from 'react-icons/fa';
import CryptoJS from "crypto-js";

const localSearch = window.location.search;
const userID = localSearch.replace('?id=', '');
const user = JSON.parse(localStorage.getItem('user'));

const DiscussionWindow = (props) => {
    const [DiscussionBacgroungColor, setDiscussionBacgroungColor] = useState(() => {
        if (user.fontColor !== undefined) {
            return user.fontColor
        }
        if(user.fontColor === undefined){
            return 'white'
        }
    }
    );
    const [showTrash, setShowTrash] = useState('none');
    const [showMenu, setShowMenue] = useState('block');
    const [isMenue, setIsMenue] = useState(true);
    const [messagesForTrash, setMessageForTrash] = useState(null);
    const setBackgroungColor = (e) => {
        // console.log(e.target.innerHTML);
        setDiscussionBacgroungColor(e.target.innerHTML);
        user.fontColor = `${e.target.innerHTML}`;
        localStorage.setItem('user', JSON.stringify(user));
        const updateFontColor = async () => {
            await fetch('../update-font-color', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    fontColor: e.target.innerHTML,
                    userID:userID
                })
            });
        }
        updateFontColor();
    }
    const deleteMessage = useLongPress(() => {
        setShowMenue('none');
        setShowTrash('block');
        setIsMenue(false);
    }, {
        onFinish: event => {
            setMessageForTrash(event.target.firstChild.data);
            // console.log(event.target);
        },
        captureEvent:true,
        threshold: 500,
        detect: "both"
    });
    const moveToTrash = () => {
        if (messagesForTrash !== null) {
            const allmessages = localStorage.getItem('messages');
            const decryptMessages = JSON.parse(CryptoJS.AES.decrypt(allmessages, `${process.env.REACT_APP_CRYPTO_KEY}`).toString(CryptoJS.enc.Utf8));
            console.log('initial lengeth', decryptMessages.length);
            let newMessages = decryptMessages.filter(({ message}) => message !== messagesForTrash);

            localStorage.setItem('messages', CryptoJS.AES.encrypt(JSON.stringify(newMessages), `${process.env.REACT_APP_CRYPTO_KEY}`));
            // const chekNewLength = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('messages'), `${process.env.REACT_APP_CRYPTO_KEY}`).toString(CryptoJS.enc.Utf8)).length;
            // console.log('ckek new lenght:', chekNewLength);

            fetch('../delete-messages', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'content-type':'application/json'
                },
                body: JSON.stringify({
                    message: messagesForTrash,
                    user:userID
                })
            })
            props.setNewMessages(newMessages);
        }
        setShowMenue('block');
        setShowTrash('none');
        setIsMenue(true);
    }

    return (
        <>
        <div className='discussion-window' style={{ background: DiscussionBacgroungColor }} >
            <div className='receiver-details'>
                <div className='receiver-details-profile'>
                    <FaArrowCircleLeft onClick={props.closeDiscussionWindow} className='faArrow-left' />
                    <img src={props.receiverAvatar} alt='profile' className='receiver-details-profile-avatar' />
                    <p className='receiver-details-profile-pseudo'>{props.receiverPseudo}</p>
                </div>
                <p className='drop-down-option'>
                    < FiMenu className='menue receiver-details-icon' style={{ display: showMenu }} />
                    <FaTrash className='trash receiver-details-icon' style={{ display: showTrash }} onClick={moveToTrash} />
                    {isMenue && <span className='backgroung-color-menu'>
                        <span>
                            <li className='color-option' onClick={setBackgroungColor}>White</li>
                            <li className='color-option' onClick={setBackgroungColor}>Turquoise</li>
                            <li className='color-option' onClick={setBackgroungColor}>Thistle</li>
                        </span>
                    </span>}
                </p>
                </div>
            <div className='message-container'>  
            <ScrollableFeed className='message-scollableFeed'>
                {   
                    props.allMessages.map((message, i) => {
                        if (message.sender === props.senderID && message.receiver === props.receiverID) {
                            return(
                            <p className="outcome-message" key={i}
                                style={{
                                    float: 'background: rgb(3,4,56) ',
                                    background: 'red'
                                }} {...deleteMessage}>{message.message} <span className='time-outCome'>{message.time}</span></p>
                                
                            ) 
                        }
                        else if (message.receiver === props.senderID && message.sender === props.receiverID) {
                            return <p className='income-message' key={i}
                                style={{
                                    float: 'left',
                                    background: 'green'
                                }}{...deleteMessage}>{message.message}  <span className='time-outIncome'>{message.time}</span></p>
                        }
                        return '';
                    })
                }

                    </ScrollableFeed>
                    </div>  
                <div className='input-container' style={{
                 background: DiscussionBacgroungColor
            }}>
                
                <TextareaAutosize placeholder='message...' className='input-container-textarea' onChange={props.getMessage} />
                <IoMdSend className='input-container-send-incon' onClick={props.sendMessage} />
                
            </div>
            </div>
            </>
    );
}

export default DiscussionWindow
