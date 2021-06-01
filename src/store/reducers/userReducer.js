export const RESET_USER = 'RESET_USER';

const initialState = {
    fileName: ''
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_USER:
            return initialState
        default:
            return state
    }
};