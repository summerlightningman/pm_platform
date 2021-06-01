import './settings.css';
import {useDispatch, useSelector} from "react-redux";
import {
    SET_ALGORITHM,
    SET_CASE_COUNT,
    SET_CLUSTER_LIST,
    SET_CLUSTER_NUM,
    SET_COLUMN_BINDINGS,
    SET_IS_CLUSTER_ENABLED,
    TOGGLE_SELECTED_CLUSTER
} from "../../../../store/reducers/logReducer";
import {SET_BROWSE_FILE} from "../../../../store/reducers/browseReducer";
import {apply, getClusters, updateAlgorithm, updateColumnNames} from "../../../../http";
import {SET_SETTINGS_IS_HIDDEN} from "../../../../store/reducers/interfaceReducer";
import {useState} from "react";

const Settings = () => {
    const [{isSettingsHidden: isHidden}, state] = useSelector(store => [store['interface'], store['log']]);
    const dispatch = useDispatch();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleColumnNameChange = ({target}) => {
        const formData = new FormData();
        formData.append(target.name, target.value);

        updateColumnNames(formData).then(
            ({data}) => {
                dispatch({type: SET_COLUMN_BINDINGS, payload: data.columnBindings});
                dispatch({type: SET_CASE_COUNT, payload: data.caseCount});
            },
            err => alert(err.response.data.text)
        );
    };

    const handleAlgorithmChange = ({target}) => {
        const formData = new FormData();
        formData.append(target.name, target.value);

        setIsButtonDisabled(true);
        updateAlgorithm(formData).then(
            ({data}) => dispatch({type: SET_ALGORITHM, payload: data.algorithm}),
            err => alert(err.response.data.text)
        );
        setIsButtonDisabled(false);
    };

    const handleClick = () => dispatch({type: SET_SETTINGS_IS_HIDDEN, payload: !isHidden});

    const handleSubmit = () => {
        const data = state.isClusterEnabled
            ? {clusterNums: Object.keys(state.selectedClusters).filter(key => state.selectedClusters[key]).map(parseInt)}
            : {};
        apply(data).then(
            ({data}) => dispatch({type: SET_BROWSE_FILE, payload: data.filename}),
            err => alert(err.response.data.text)
        );
    };

    // const downloadLog = (clusterNums = undefined) => {};

    const handleEnableToggle = ({target}) => dispatch({type: SET_IS_CLUSTER_ENABLED, payload: target.checked});

    const handleCaseNumChange = ({target}) => dispatch({type: SET_CLUSTER_NUM, payload: target.value});

    const handleClusterCheck = key => ({target}) => toggleSelectedCluster(target.checked, key);

    const toggleSelectedCluster = (checked, key) => dispatch({
        type: TOGGLE_SELECTED_CLUSTER,
        payload: {[key]: checked}
    });

    const runCluster = () => {
        const data = {value: parseInt(state.clusterNum)};
        getClusters(data).then(
            ({data}) => {
                const clusterList = data['clusters'];
                const selectedClusters = Object.fromEntries(data['clusters'].map(([key,]) => [key, false]));
                dispatch({type: TOGGLE_SELECTED_CLUSTER, payload: selectedClusters});
                dispatch({type: SET_CLUSTER_LIST, payload: clusterList});
            },
            err => alert(err.response.data.text)
        )
    };


    const renderCluster = ([key, value]) =>
        <li key={`${key}${value}`} className="cluster-list-item">
            <label>
                <input
                    type="checkbox"
                    onChange={handleClusterCheck(key)}
                    checked={state.selectedClusters[key]}
                    disabled={!state.isClusterEnabled}
                /> {key} ({value})
            </label>
        </li>;

    const content = <div className="settings-inner">
        <span className="settings-label">Число кейсов: {state.caseCount}</span>
        <div className="form-control">
            <label htmlFor="algorithm" className="settings-label">Алгоритм</label>
            <select
                name="algorithm"
                id="algorithm"
                value={state.algorithm}
                onChange={handleAlgorithmChange}
            >
                {state.algorithmList.map(({value, label}) => <option value={value} key={value}>{label}</option>)}
            </select>
        </div>
        <div className="form-control">
            <label htmlFor="case_id" className="settings-label">Номер кейса</label>
            <select
                id="case_id"
                name="case_id"
                value={state.columnNames.case_id}
                onChange={handleColumnNameChange}
            >
                {state.columnList.map(col => <option value={col} key={col}>{col}</option>)}
            </select>
        </div>
        <div className="form-control">
            <label htmlFor="activity_key" className="settings-label">Действие</label>
            <select
                name="activity_key"
                id="activity_key"
                value={state.columnNames.activity_key}
                onChange={handleColumnNameChange}
            >
                {state.columnList.map(col => <option value={col} key={col}>{col}</option>)}
            </select>
        </div>
        <div className="form-control">
            <label htmlFor="timestamp_key" className="settings-label">Дата/время</label>
            <select
                name="timestamp_key"
                id="timestamp_key"
                value={state.columnNames.timestamp_key}
                onChange={handleColumnNameChange}
            >
                {state.columnList.map(col => <option value={col} key={col}>{col}</option>)}
            </select>
        </div>
        <div className="form-control">
            <input type="checkbox" id="enable-clusters" checked={state.isClusterEnabled} onChange={handleEnableToggle}/>
            <label htmlFor="enable-clusters">
                Включить кластеризацию
            </label>
        </div>
        <div className="cluster-block">
            <div className="form-control">
                <label htmlFor="cluster-num" className="settings-label cluster-label">Число кластеров</label>
                <input
                    type="number"
                    id="cluster-num"
                    value={state.clusterNum}
                    onChange={handleCaseNumChange}
                    min={2}
                    max={10}
                    disabled={!state.isClusterEnabled}
                />
            </div>
            <button
                onClick={runCluster}
                disabled={!state.isClusterEnabled}
                className="settings-execute-button"
            >
                Запустить кластеризацию
            </button>
            <div className="form-control">
                <label className="settings-label cluster-label">Список кластеров</label>
                <ul id="cluster-list" className="cluster-list">
                    {state.clusterList.map(renderCluster)}
                </ul>
            </div>
        </div>
        <button
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            className="settings-execute-button"
        >
            Построить
        </button>
    </div>;

    return (
        <div className="settings">
            <button className="settings-button" onClick={handleClick}>{!isHidden ? '>>' : '<<'}</button>
            {!isHidden ? content : ''}
        </div>
    );
};

export default Settings;