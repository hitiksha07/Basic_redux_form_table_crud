import { ADD, DELETE, UPDATE } from "../Type/Type"

// ---------------get=================
export const getUserValue = (obj) => {
    return (dispatch) => {
        dispatch(getData(obj))
    }
};
const getData = (obj) => {
    return {
        type: ADD,
        data: obj
    }
}

// ------------------edit=====================
export const editUserData = (obj, index) => {
    return (dispatch) => {
        dispatch(editData(obj, index))
    }
};
const editData = (obj, index) => {
    return {
        type: UPDATE,
        data: obj,
        index: index
    }
}
// -----------delete============
export const deleteUserData = (i) => {
    return (dispatch) => {
        dispatch(deleteData(i))
    }
};
const deleteData = (i) => {
    return {
        type: DELETE,
        i: i
    }
}