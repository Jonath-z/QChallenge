import { FiMenu } from "react-icons/fi"
import { IoMdSend } from 'react-icons/io';
import { FaArrowCircleLeft } from 'react-icons/fa';
import TextareaAutosize from "react-textarea-autosize";
import { useState, useRef, useEffect } from "react";
import ScrollableFeed from 'react-scrollable-feed'
import './DiscussionWindow.css';
// import CryptoJS from "crypto-js";

const localSearch = window.location.search;
const userID = localSearch.replace('?id=', '');
const user = JSON.parse(localStorage.getItem('user'));

const DiscussionWindow = (props) => {
    const [DiscussionBacgroungColor, setDiscussionBacgroungColor] = useState(() => {
        if (user.fontColor) {
            return user.fontColor
        } else {
            return 'white'
        }
    }
    );

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

    return (
        <div className='discussion-window' style={{ background: DiscussionBacgroungColor }} >
            <div className='receiver-details'>
                <div className='receiver-details-profile'>
                    <FaArrowCircleLeft onClick={props.closeDiscussionWindow} className='faArrow-left' />
                    <img src={props.receiverAvatar} alt='profile' className='receiver-details-profile-avatar' />
                    <p className='receiver-details-profile-pseudo'>{props.receiverPseudo}</p>
                </div>
                <p className='drop-down-option'>
                    < FiMenu className='receiver-details-icon' />
                    <div className='backgroung-color-menu'>
                        <ul>
                            <li className='color-option' onClick={setBackgroungColor}>White</li>
                            <li className='color-option' onClick={setBackgroungColor}>Turquoise</li>
                            <li className='color-option' onClick={setBackgroungColor}>Thistle</li>
                        </ul>
                    </div>
                </p>
            </div>
            <ScrollableFeed className='message-container' ref={props.scrollDown}>

                {
                    props.allMessages.map((message) => {
                        if (message.sender === userID) {
                            return <p className="outcome-message" style={{
                                float: 'background: rgb(3,4,56) ',
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

            </ScrollableFeed>
            <div className='input-container'>
                
                <TextareaAutosize placeholder='message...' className='input-container-textarea' onChange={props.getMessage} />
                <IoMdSend className='input-container-send-incon' onClick={props.sendMessage} />
                
            </div>
        </div>
    );
}

export default DiscussionWindow
