import { ADD, DELETE, UPDATE } from "../Type/Type";

let initialstate = {
    User: JSON.parse(localStorage.getItem('persistantState')) || []
    // User: []
};

export function UserReducer(state = initialstate, action) {
    switch (action.type) {
        case ADD:
            state.User = [...state.User, action.data];
            return {
                User: state.User
            };
        case UPDATE:
            state.User.splice(action.index, 1, action.data);
            return {
                User: state.User
            };
        case DELETE:
            state.User.splice(action.i, 1);
            return {
                User: [...state.User]
            };
        default:
            return state;
    }
}