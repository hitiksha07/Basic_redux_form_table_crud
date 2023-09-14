import { SUCCESS } from "../Type/Type";

let initialstate = {
    Success: []
};

export function SuccessReducer(state = initialstate, action) {
    switch (action.type) {
        case SUCCESS:
            return {
                Success: [...action.data]
            };
        default:
            return state;
    }

}