import {useState} from 'react';

import './file-upload.css';
import {uploadLog} from "../../../../http";
import {useDispatch} from "react-redux";
import {
    SET_ALGORITHM_LIST,
    SET_CASE_COUNT,
    SET_COLUMN_LIST,
    SET_FILENAME
} from "../../../../store/reducers/logReducer";
import {useHistory} from "react-router-dom";
import {RESET_BROWSE} from "../../../../store/reducers/browseReducer";
import {SET_GALLERY_IS_HIDDEN, SET_SETTINGS_IS_HIDDEN} from "../../../../store/reducers/interfaceReducer";

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const history = useHistory();

    const handleProgress = ({loaded = 0, total = 0}) =>
        setLoadingProgress(Math.round(100 * loaded / total));
    const handleChange = e => setFile(e.target.files[0]);
    const dispatch = useDispatch();

    const handleClick = () => {
        const formData = new FormData();
        formData.append('file', file, file.name);

        uploadLog(formData, handleProgress).then(
            ({data}) => {
                const actions = [
                    {type: SET_FILENAME, payload: data.name},
                    {type: SET_COLUMN_LIST, payload: data.columns},
                    {type: SET_CASE_COUNT, payload: data.caseCount},
                    {type: SET_ALGORITHM_LIST, payload: data.algorithms},
                    {type: SET_GALLERY_IS_HIDDEN, payload: true},
                    {type: SET_SETTINGS_IS_HIDDEN, payload: false},
                    {type: RESET_BROWSE}
                ];
                actions.forEach(dispatch);
                history.push('/main/analyze');
            },
            err => {
                setErrorMsg(err.response.data.text);
                setLoadingProgress(0);
            }
        );
    };

    const progressBarStyle = {width: loadingProgress + '%'};

    return (
        <div className="file-upload">
            <h2>Загрузка файла</h2>
            <div className="file-upload-form">
                <input type="file" onChange={handleChange}/>
                <button className="btn" onClick={handleClick}>Отправить</button>
            </div>
            <span className="upload-error">{errorMsg}</span>
            <div className="progressbar">
                <div className="progressbar-outer">
                    <div className="progressbar-inner" style={progressBarStyle}>
                        {loadingProgress >= 100 ? 'Готово' : ''}
                    </div>
                </div>
                <div className="percentage">{loadingProgress}%</div>
            </div>
        </div>
    );
};

export default FileUpload;