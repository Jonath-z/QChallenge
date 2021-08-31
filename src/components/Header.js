// import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import './Header.css';


const Header = () => {
    const [placeholder, setPlaceholder] = useState('Search');
    const setFucus = () => {
        setPlaceholder('');
        return () => {
            setPlaceholder('Search');
        }
    }
    const setFucusOut = () => {
        setPlaceholder('Search');
    }
    return (
        <div>
            <ul className='headerComponent'>
                <li><h1 className='appNameNav'>QChallenge</h1></li>
                <li><input type='search' className="searchBar" placeholder={placeholder} onFocus={setFucus} onBlur={setFucusOut}></input></li>
                <li  className='optionHeader'>Option</li>
                <li className='documentationHeader'>Documentation</li>
                <li className='AccountHeader'>Account</li>
            </ul>
        </div>
    );
}

export default Header
