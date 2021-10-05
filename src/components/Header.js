// import { FaSearch } from 'react-icons/fa';
import { useState,useEffect } from 'react';
import { useHistory } from 'react-router';
import CryptoJS from 'crypto-js';
import './Header.css';


const Header = (props) => {
    const [placeholder, setPlaceholder] = useState('Search');
    const [allUsers, setAllUser] = useState();
    const [searchPseudo, setSearchPseudo] = useState(null);
    useEffect(() => {
        setAllUser(
            () => {
                const usersDecrypted = CryptoJS.AES.decrypt(localStorage.getItem('allUsers'), 'QChallenge001').toString(CryptoJS.enc.Utf8);
                return JSON.parse(usersDecrypted);
            }
        )
    }, []);
    useEffect(() => {
        if (!props.searchClosed) {
            setFucusOut();
            const inputSearch = document.querySelector('.searchBar');
            inputSearch.value = ''
            setPlaceholder('Search');
            setSearchPseudo(null);
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
        allUsers.map(({ pseudo }) => {
            if (typeof pseudo === 'string') {
                if (pseudo.includes(e.target.value.trim())) {
                    console.log(pseudo);
                    setSearchPseudo(pseudo);
                    // getSearchResult(pseudo);
                }
            }
        });
    }
    useEffect(() => {
        const getSearchResult = (searchResult) => {
            if (searchResult !== null && searchResult !== '') {
                const usersDecrypted = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('allUsers'), 'QChallenge001')
                    .toString(CryptoJS.enc.Utf8));
                const result = usersDecrypted.filter(({ pseudo }) => searchResult === pseudo)
                console.log(result);
                props.setSearchResult(result);
            }
        }
        getSearchResult(searchPseudo);
    }, [searchPseudo]);
    return (
        <div className="headerContainer">
            <ul className='headerComponent'>
                <li className='header-li'><h1 className='appNameNav'>QChallenge</h1></li>
                <li className='header-li'><input
                    type='search'
                    className="searchBar"
                    placeholder={placeholder}
                    onFocus={setFucus}
                    onBlur={setFucusOut}
                    onChange={research}>
                </input></li>
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
