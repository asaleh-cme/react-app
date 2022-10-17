import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import '../../App.css';
import Login from '../Login/Login.js'
import Users from '../Users/Users.js';
import EditUser from '../Users/EditUser.js';
import { connect } from 'react-redux';
import { getState, setState } from '../Common/ReduxStore.js'


const ProtectedRoute = (props, { children }) => {
  //authorization here is used in a simple way
  var stateStore = props.stateStore;
  var isLoggedIn = stateStore.auth.isLoggedIn
  if (!isLoggedIn) {
   return <Navigate to="/" replace />;
  }

  return props.children;
}

class Routing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route exact path='/' element={< Login />}></Route>
            <Route exact path='/login' element={< Login />}></Route>
            <Route exact path='/users' element={<ProtectedRoute stateStore={this.props.stateStore}>< Users /></ProtectedRoute>}></Route>
            <Route exact path='/user/:id' element={<ProtectedRoute stateStore={this.props.stateStore}>< EditUser /></ProtectedRoute>}></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}
export default connect(getState, setState)(Routing);