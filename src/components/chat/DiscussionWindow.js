import { FiMenu } from "react-icons/fi"
import { IoMdSend } from 'react-icons/io';
import { FaArrowCircleLeft } from 'react-icons/fa';
import TextareaAutosize from "react-textarea-autosize";
import { useRef,useState } from "react"

import './DiscussionWindow.css';
import CryptoJS from "crypto-js";

const localSearch = window.location.search;
const userID = localSearch.replace('?id=', '');

const getCryptedMessages = localStorage.getItem('messages');
const decryptMessage = JSON.parse(CryptoJS.AES.decrypt(getCryptedMessages, 'QChallenge001').toString(CryptoJS.enc.Utf8));

const DiscussionWindow = (props) => {
    const allMessages = useRef(decryptMessage);

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
                {props.outMessage}

            </div>
            <div className='input-container'>
                <div>
                    <TextareaAutosize placeholder='message...' className='input-container-textarea' onChange={props.getMessage}/>
                </div>
                
                    <IoMdSend className='input-container-send-incon' onClick={props.sendMessage} />
                
            </div>
        </div>
    );
}

export default DiscussionWindow
