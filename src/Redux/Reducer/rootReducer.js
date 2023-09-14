import { SuccessReducer } from "./ApiReducer";
import { UserReducer } from "./UserReducer";
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    User: UserReducer,
    Success: SuccessReducer
})