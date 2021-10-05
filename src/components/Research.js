import './Research.css';
import { MdCancel } from 'react-icons/md';
import { RiMessage3Fill } from 'react-icons/ri';
const userID = window.location.search.replace('?id=', '');
const Research = (props) => {
    const closeIsResearch =()=> {
        props.closeResearch(false);
    }
    const goToUserProfile = () => {
        const getUserProfileNode = document.querySelector('.user-profile');
        const userProfileUrl = getUserProfileNode.src;
        const userPseudo = document.querySelector('.user-pseudo').innerHTML;
        console.log(userProfileUrl,userPseudo);
    }
    const goToChat = () => {
        const getUserProfileNode = document.querySelector('.user-profile');
        const userProfileUrl = getUserProfileNode.src;
        const userPseudo = document.querySelector('.user-pseudo').innerHTML;
        props.goToChatUserPseudo(userPseudo)
        props.goToChatUserProfile(userProfileUrl);
        console.log(userProfileUrl,userPseudo);
    }

    return (
        <div className='research'>
            <div className='cancel'><MdCancel className='cancel' onClick={closeIsResearch }/></div>
            {
                props.result !== undefined && props.result.map((user, index) => {
                    if (user.id !== userID) {
                        return (
                            < div key={index} className='resultContainer' >
                                <img src={user.avatar} style={{
                                    width: '50px',
                                    borderRadius: '50%',
                                    border: '2px solid rgb(172, 174, 246)'
                                }}
                                    className='user-profile'
                                    onClick={goToUserProfile} 
                                />
                                <p className='user-pseudo'>{user.pseudo}</p>
                                <div className='icons-container'>
                                    <RiMessage3Fill className='message-icon'
                                        onClick={() => {
                                            goToChat();
                                            props.openNewChat();
                                        }}
                                        // onClick={}
                                    />
                                </div>
                            </div>
                        )
                    }
                    return;
                })
            }
        </div>
    );
}

export default Research
