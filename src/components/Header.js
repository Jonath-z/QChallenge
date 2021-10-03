// import { FaSearch } from 'react-icons/fa';
import { useState,useRef,useEffect } from 'react';
import { useHistory } from 'react-router';
import './Header.css';


const Header = (props) => {
    const [placeholder, setPlaceholder] = useState('Search');
    let history = useHistory();

    const setFucus = () => {
        setPlaceholder('');
        return () => {
            setPlaceholder('Search');
        }
    }
    const setFucusOut = () => {
        setPlaceholder('Search');
    }
    const openAccount = () => {
        history.push(`/Account/?id=${JSON.parse(localStorage.getItem('user')).data.id}`);
    }
    return (
        <div className="headerContainer">
            <ul className='headerComponent'>
                <li className='header-li'><h1 className='appNameNav'>QChallenge</h1></li>
                <li className='header-li'><input type='search' className="searchBar" placeholder={placeholder} onFocus={setFucus} onBlur={setFucusOut}></input></li>
                <li className='optionHeader option header-li'>Options
                    <div className='Options-dropList'>
                        <span className='duel-option' onClick={props.openDuel}>Create the duel</span><br/><br/>
                        <span className='duel-option'>Join the duel</span>
                    </div>
                </li>
                <li className='documentationHeader option header-li'>Documentation</li>
                <li className='AccountHeader option header-li' onClick={openAccount}>Account</li>
            </ul>
        </div>
    );
}

export default Header
