import {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getDownloadLogLink, getImageURL, getLogCSV} from "../../../../http";
import {RESET_COORDINATES, SET_XY} from "../../../../store/reducers/browseReducer";

import './browse.css';
import {useLocation} from "react-router-dom";

const Browse = () => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [cursor, setCursor] = useState('grab');
    const dispatch = useDispatch();
    const [{filename, x, y}, {isSettingsHidden}, {selectedClusters}] =
        useSelector(store => [store['browse'], store['interface'], store['log']]);
    const location = useLocation();

    const url = getImageURL(filename);
    const backgroundImage = `url('${url}')`;

    const handleMouseDown = () => {
        setCursor('grabbing');
        setIsMouseDown(true);
    };

    const handleMouseUp = () => {
        setCursor('grab');
        setIsMouseDown(false);
    }

    const handleMouseMove = ({movementX: dx, movementY: dy}) =>
        isMouseDown ? dispatch({type: SET_XY, payload: {x: x + dx, y: y + dy}}) : null;

    const handleResetClick = () => dispatch({type: RESET_COORDINATES});

    const browseStyle = {
        backgroundImage,
        backgroundPositionX: x,
        backgroundPositionY: y,
        cursor
    };

    const buttonStyle = {
        marginRight: isSettingsHidden ? '10px' : 'calc(20vw + 10px)',
    };

    const downloadImage = () => window.open(url, '_blank');

    const downloadLog = () => {
        const clusterList = Object.keys(selectedClusters).filter(key => selectedClusters[key]);
        const data = {clusterNums: clusterList};
        getLogCSV(data).then(
            ({data}) => window.open(getDownloadLogLink(data.filename)),
            err => console.log(err.response.data.text)
        );
    };

    return (
        <div
            className="browse"
            style={browseStyle}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            <button
                className="browse-button"
                style={buttonStyle}
                onClick={handleResetClick}
            >
                Сброс положения
            </button>
            <button
                className="browse-button"
                style={buttonStyle}
                onClick={downloadImage}
            >
                Загрузить PNG
            </button>
            <button
                className="browse-button"
                style={buttonStyle}
                onClick={downloadLog}
                hidden={location.pathname !== '/main/analyze' && !filename}
            >
                Загрузить лог (CSV)
            </button>
        </div>
    );
};

export default Browse;