export const SET_FILENAME = 'SET_FILENAME';
export const SET_CASE_COUNT = 'SET_CASE_COUNT';
export const SET_COLUMN_BINDINGS = 'SET_COLUMN_NAMES';
export const SET_COLUMN_LIST = 'SET_COLUMN_LIST';
export const SET_ALGORITHM = 'SET_ALGORITHM';
export const SET_ALGORITHM_LIST = 'SET_ALGORITHM_LIST';
export const SET_IS_CLUSTER_ENABLED = 'SET_IS_CLUSTER_ENABLED';
export const SET_CLUSTER_NUM = 'SET_CLUSTER_NUM';
export const SET_CLUSTER_LIST = 'SET_CLUSTER_LIST';
export const TOGGLE_SELECTED_CLUSTER = 'ADD_SELECTED_CLUSTER';
export const REMOVE_SELECTED_CLUSTER = 'REMOVE_SELECTED_CLUSTER';
export const RESET_LOG = 'RESET_LOG';

const initialState = {
    filename: '',
    caseCount: 0,
    columnList: [],
    columnNames: {
        case_id: '',
        activity_key: '',
        timestamp_key: '',
    },
    algorithmList: [],
    algorithm: '',
    gallery: [],
    isClusterEnabled: false,
    clusterNum: 3,
    clusterList: [],
    selectedClusters: {}
}

export const logReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILENAME:
            return {...state, filename: action.payload}
        case SET_CASE_COUNT:
            return {...state, caseCount: action.payload}
        case SET_COLUMN_BINDINGS:
            return {...state, columnNames: {...state.columnNames, ...action.payload}}
        case SET_COLUMN_LIST:
            return {...state, columnList: [...action.payload]}
        case SET_ALGORITHM_LIST:
            return {...state, algorithmList: action.payload}
        case SET_ALGORITHM:
            return {...state, algorithm: action.payload}
        case SET_IS_CLUSTER_ENABLED:
            return {...state, isClusterEnabled: action.payload}
        case SET_CLUSTER_NUM:
            return {...state, clusterNum: action.payload}
        case SET_CLUSTER_LIST:
            return {...state, clusterList: action.payload}
        case TOGGLE_SELECTED_CLUSTER:
            return {...state, selectedClusters: {...state.selectedClusters, ...action.payload}}
        case RESET_LOG:
            return initialState
        default:
            return state
    }
};