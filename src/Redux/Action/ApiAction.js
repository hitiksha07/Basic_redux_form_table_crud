import { SUCCESS } from "../Type/Type"
import axios from 'axios';

export const getApidata = () => {
    return (dispatch) => {
        axios.get('http://localhost:3001/posts').then(res => {
            dispatch(getApi1(res.data))
            console.log(res.data)
        })
    }
}
export const addApiData = (obj) => {
    return (dispatch) => {
        axios.post('http://localhost:3001/posts',obj).then(res => {
            console.log('add',res.data)
            dispatch(getApidata())
        })
    }
}
export const deleteApiData = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3001/posts/${id}`).then(res => {
            console.log('delete',res.data)
            dispatch(getApidata())
        })
    }
};
export const editApidata = (obj) => {
    return (dispatch) => {
        axios.put(`http://localhost:3001/posts/${obj.id}`, obj).then(res => {
            console.log(res.data)
            dispatch(getApidata())
        })
    }
};
const getApi1 = (data) => {
    return {
        type: SUCCESS,
        data: data
    }
}