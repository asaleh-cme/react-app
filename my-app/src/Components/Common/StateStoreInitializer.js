import { createStore } from 'redux';

const initialState = {
    auth: {
        isLoggedIn: false,
        token: ""
    }
}

const ReduxStore = function (state, action) {
    if (state == null){
        state = initialState;
        return state;
    }        
    else
        return state;
};

const StateStoreInitializer = {
    store: createStore(ReduxStore)
}
export default StateStoreInitializer