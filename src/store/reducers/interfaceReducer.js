export const SET_GALLERY_IS_HIDDEN = 'SET_GALLERY_IS_HIDDEN';
export const SET_SETTINGS_IS_HIDDEN = 'SET_SETTINGS_IS_HIDDEN';
export const SET_DOWNLOAD_LOG_URL = 'SET_DOWNLOAD_LOG_URL';

const initialState = {
    isGalleryHidden: false,
    isSettingsHidden: false,
    downloadLogUrl: '/'
};

export const interfaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GALLERY_IS_HIDDEN:
            return {...state, isGalleryHidden: action.payload}
        case SET_SETTINGS_IS_HIDDEN:
            return {...state, isSettingsHidden: action.payload}
        default:
            return state
    }
};