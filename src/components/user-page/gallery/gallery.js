import {useMemo, useState} from 'react';
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';

import {deleteGraph, getGallery} from "../../../http";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SET_BROWSE_FILE} from "../../../store/reducers/browseReducer";
import {SET_GALLERY_IS_HIDDEN, SET_SETTINGS_IS_HIDDEN} from "../../../store/reducers/interfaceReducer";


import './gallery.css';

const Gallery = () => {
    const [itemList, setItemList] = useState([]);
    const {isGalleryHidden: isHidden} = useSelector(store => store.interface);

    const dispatch = useDispatch();
    const history = useHistory();

    const updateGallery = () => getGallery().then(({data}) => setItemList(data.items));

    useMemo(updateGallery, []);

    const handleItemClick = filename => () => showGraph(filename);

    const showGraph = filename => {
        const actions = [
            {type: SET_BROWSE_FILE, payload: filename},
            {type: SET_SETTINGS_IS_HIDDEN, payload: true},
            {type: SET_GALLERY_IS_HIDDEN, payload: false},
        ];
        actions.forEach(dispatch);
        history.push('/main/browse/');
    }

    const handleItemButtonClick = filename => (e) => $deleteGraph(e, filename)

    const $deleteGraph = (e, filename) => {
        e.stopPropagation();
        deleteGraph({filename}).then(
            ({data}) => data.code === 200 ? updateGallery() : null,
            err => alert(err.response.data.text)
        );
    }


    const renderItem = ({name, added, algorithm}) =>
        <li className="gallery-item" key={name} onClick={handleItemClick(name)}>
            <div className="gallery-item-container">
                <Tippy content={name} placement="right">
                    <span className="gallery-item-name">{name.length > 26 ? name.slice(0, 23) + '...' : name}</span>
                </Tippy>
                <button className="gallery-item-delete" onClick={handleItemButtonClick(name)}>X</button>
            </div>
            <span className="gallery-item-algorithm">{algorithm}</span>
            <span className="gallery-item-added">{added}</span>
        </li>;


    const content = <div className="gallery-inner">
        <div className="gallery-header"><span>Витрина</span></div>
        <ul className="gallery-list">{
            itemList.length ? itemList.map(item => renderItem(item)) : <span>(Пусто)</span>
        }</ul>
    </div>;

    const handleClick = () => dispatch({type: SET_GALLERY_IS_HIDDEN, payload: !isHidden});

    return (
        <div className="gallery">
            {!isHidden ? content : ''}
            <button className="gallery-button" onClick={handleClick}>{isHidden ? '>>' : '<<'}</button>
        </div>
    );
};

export default Gallery;