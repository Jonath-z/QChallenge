import { useRef } from "react"
import CryptoJS from "crypto-js";

const localSearch = window.location.search;
const userID = localSearch.replace('?id=', '');

const getCryptedMessages = localStorage.getItem('messages');
const decryptMessage = JSON.parse(CryptoJS.AES.decrypt(getCryptedMessages, 'QChallenge001').toString(CryptoJS.enc.Utf8));

const Messages = (props) => {
   
    const allMessages = useRef(decryptMessage);
    return (
        <div>
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
            {props.outcomeMessage}
            <p className='income-message'>{props.incomeMessage}</p>
        </div>
    );
}

export default Messages
