import { FiMenu } from "react-icons/fi"
import { IoMdSend } from 'react-icons/io';
import { FaArrowCircleLeft } from 'react-icons/fa';
import TextareaAutosize from "react-textarea-autosize";
import Messages from "./Messages";
import { useState } from "react";

import './DiscussionWindow.css';
import { set } from "mongoose";
const userID = window.location.search.replace('?id=', '');

const DiscussionWindow = (props) => {
    const [message, setMessage] = useState('');
    // const [outcomeMessage, setOutcomeMessage] = useState();
    
    const getMessage = (e) => {
        setMessage(e.target.value);
        return outcomeMessage(message);
    }
    const outcomeMessage = (message) => {
        return <p className='outcome-message'>{ message}</p>
    }
    return (
        <div className='discussion-window'>
            <div className='receiver-details'>
                <div className='receiver-details-profile'>
                    <FaArrowCircleLeft onClick={props.closeDiscussionWindow} className='faArrow-left' />
                    <img src={props.receiverAvatar} alt='image' className='receiver-details-profile-avatar' />
                    <p className='receiver-details-profile-pseudo'>{props.receiverPseudo}</p>
                </div>
                < FiMenu className='receiver-details-icon' />
            </div>
            <div className='message-container'>
                <Messages
                    incomeMessage={props.incomeMessage}
                    outcomeMessage={outcomeMessage}
                />
            </div>
            <div className='input-container'>
                <div>
                    <TextareaAutosize placeholder='message...' className='input-container-textarea' onChange={props.getMessage,getMessage}/>
                </div>
                
                    <IoMdSend className='input-container-send-incon' onClick={props.sendMessage,sendMessage} />
                
            </div>
        </div>
    );
}

export default DiscussionWindow
