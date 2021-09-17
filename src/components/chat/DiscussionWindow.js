import { FiMenu } from "react-icons/fi"
import { IoMdSend } from 'react-icons/io';
import { FaArrowCircleLeft } from 'react-icons/fa';
import './DiscussionWindow.css';

const DiscussionWindow = (props) => {
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
                <p>message</p>
            </div>
            <div className='input-container'>
                <textarea placeholder='message...' className='input-container-textarea' />
                <p className='input-container-send-incon'>
                    <IoMdSend />
                </p>
            </div>
        </div>
    );
}

export default DiscussionWindow
