import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
//import  StateStoreInitializer  from './Components/Common/StateStoreInitializer.js'

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

const store = createStore(ReduxStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
