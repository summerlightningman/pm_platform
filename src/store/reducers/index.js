import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {logReducer} from "./logReducer";
import {browseReducer} from "./browseReducer";
import {interfaceReducer} from "./interfaceReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    log: logReducer,
    browse: browseReducer,
    interface: interfaceReducer
});