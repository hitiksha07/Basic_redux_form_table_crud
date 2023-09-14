import { applyMiddleware, createStore } from 'redux'
import { rootReducer } from '../Reducer/rootReducer'
import thunk from 'redux-thunk'
// function saveToLocalStorage(state) {
//     try {
//       const serialisedState = JSON.stringify(state.User.User);
//       localStorage.setItem("persistantState", serialisedState);
//     } catch (e) {
//       console.warn(e);
//     }
// }
// function loadFromLocalStorage() {
//     try {
//       const serialisedState = localStorage.getItem("persistantState");
//       if (serialisedState === null) return undefined;
//       return JSON.parse(serialisedState);
//     } catch (e) {
//       console.warn(e);
//       return undefined;
//     }
//   }
// const store = createStore(rootReducer,loadFromLocalStorage(),applyMiddleware(thunk))
const store = createStore(rootReducer,applyMiddleware(thunk))

// store.subscribe(() => saveToLocalStorage(store.getState()));

export default store 