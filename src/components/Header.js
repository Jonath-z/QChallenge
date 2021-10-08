import MediaQuery from 'react-responsive';
import { useState,useEffect } from 'react';
import { useHistory } from 'react-router';
import './Header.css';
import { FiMenu } from 'react-icons/fi';
import { MdCancel } from 'react-icons/md';



const Header = (props) => {
    const [placeholder, setPlaceholder] = useState('Search');
    const [searchBarIsHiden, setSearchBarIsHidden] = useState(true);
    const [showMenuSlide, setShowMenuSlide] = useState(false);

    useEffect(() => {
        if (!props.searchClosed) {
            setFucusOut();
            const inputSearch = document.querySelector('.searchBar');
            inputSearch.value = ''
            setPlaceholder('Search');
            // setSearchPseudo(null);
            // console.log(inputSearch);
        }
    },[props.searchClosed])

    let history = useHistory();
    const setFucus = () => {
        setPlaceholder('');
        props.setIsResearch(true)
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

    const research = (e) => {
        props.setSearchInputValue(e.target.value);
    }
   
    return (
        <div className="headerContainer">
            <MediaQuery minWidth={300} maxWidth={414}>
                <div className='header-responsive'>
                    <ul className='headerComponent'>
                        <li className='header-li'><h1 className='appNameNav'>QChallenge</h1></li>
                        <li className='header-li'><input
                            hidden={searchBarIsHiden}
                            type='search'
                            className="searchBar"
                            placeholder={placeholder}
                            onFocus={setFucus}
                            onBlur={setFucusOut}
                            onChange={research}
                        /></li>
                        <li className='header-li fiMenu'><FiMenu onClick={() => {
                            if (showMenuSlide === false) {
                                setShowMenuSlide(true);
                            } else {
                                setShowMenuSlide(false);
                            }
                        } }/></li>
                    </ul>
                    {showMenuSlide && <div className='header-slide-menue'>
                        <ul className='ul-responsive'>
                            <li className='optionHeader option header-li'>Options
                                <div className='Options-dropList'>
                                    <p className='duel-option' onClick={props.openDuel}>Create the duel</p><br /><br />
                                    <p className='duel-option' onClick={props.openDuel}>Join the duel</p>
                                </div>
                            </li>
                            <li className='documentationHeader option header-li'>Documentation</li>
                            <li className='AccountHeader option header-li' onClick={openAccount}>Account</li>
                        </ul>
                    </div>}
                </div>
            </MediaQuery>
            <MediaQuery minWidth={416} maxWidth={2000}>
                <ul className='headerComponent'>
                    <li className='header-li'><h1 className='appNameNav'>QChallenge</h1></li>
                    <li className='header-li'><input
                        type='search'
                        className="searchBar"
                        placeholder={placeholder}
                        onFocus={setFucus}
                        onBlur={setFucusOut}
                        onChange={research}
                    /></li>
                    <li className='optionHeader option header-li'>Options
                        <div className='Options-dropList'>
                            <span className='duel-option' onClick={props.openDuel}>Create the duel</span><br /><br />
                            <span className='duel-option' onClick={props.openDuel}>Join the duel</span>
                        </div>
                    </li>
                
                    <li className='documentationHeader option header-li'>Documentation</li>
                    <li className='AccountHeader option header-li' onClick={openAccount}>Account</li>
                </ul>
            </MediaQuery>
        </div>
    );
}

export default Header
