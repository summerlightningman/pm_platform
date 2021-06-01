import {useMemo, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";


import {RESET_LOG} from "../../../store/reducers/logReducer";
import {RESET_USER} from "../../../store/reducers/userReducer";
import {RESET_BROWSE} from "../../../store/reducers/browseReducer";
import {getUserData} from "../../../http";

import {useDispatch, useSelector} from "react-redux";
import {useCookies} from "react-cookie";

import './header.css'


const Header = () => {
    const [username, setUsername] = useState('');
    const {isGalleryHidden} = useSelector(store => store.interface);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [cookies, , removeCookie] = useCookies();

    useMemo(() => getUserData(), []).then(({data: username}) => setUsername(username));

    const logout = () => {
        Object.keys(cookies).forEach(removeCookie);

        const types = [RESET_LOG, RESET_USER, RESET_BROWSE];
        types.forEach(type => dispatch({type}));

        history.push('/login/');
    };

    const back = () => history.push('/main/upload');

    const backStyle = {
        marginLeft: isGalleryHidden ? '5px' : 'calc(18vw + 5px)',
        visibility: location.pathname === '/main/upload' ? 'hidden' : 'visible',
    };


    return (
        <header className="header">
            <button className="btn-header" style={backStyle} onClick={back}>Назад</button>
            <h1 className="header-label">Process mining</h1>
            <div className="user-data">
                <span>{username} </span>
                <button className="btn-header" onClick={logout}>Выход</button>
            </div>
        </header>
    );
};

export default Header;