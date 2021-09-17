import { AiFillMessage } from 'react-icons/ai'
import './Discution-icon.css'

const DiscutionIcon = (props) => {
    return (
        <div className='dicution-incon-container'>
            <AiFillMessage className='discution-icon' onClick={props.openChatWindow}/>
        </div>
    )
}

export default DiscutionIcon
