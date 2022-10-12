import React, { useState, useEffect } from 'react';
import loginImg from '../../Assets/Images/login.png'
import { UserOutlined, LockFilled } from '@ant-design/icons';
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import { POST } from '../../Infrastructure/HttpCalls/Axios.js'
import '../../Assets/Css/Login.css';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { getState, setState } from '../Common/ReduxStore.js'

function Login(props) {

    //declare method variables
    const navigate = useNavigate();
    const FormItem = Form.Item;

    //declare private variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");

    var currentStoreState = props.stateStore;

    //declare functions
    function handleLogin(e) {
        if (validForm()) {
            //initialize body data
            var loginForm = {
                email: email,
                password: password
            }

            
            //call login api
            POST("http://restapi.adequateshop.com/api/authaccount/login", loginForm).then((result) => {
                if (result.data.code == 0) {
                    setLoginMessage('');
                    currentStoreState.auth.isLoggedIn = true;
                    currentStoreState.auth.token = result.data.data.Token;
                    localStorage.setItem("token", result.data.data.Token);
                    setState(currentStoreState)
                    navigate('/users');
                }
                else {
                    setLoginMessage(result.data.message);
                    currentStoreState.auth.isLoggedIn = false;
                    currentStoreState.auth.token = "";
                    localStorage.setItem("token", "");
                    setState(currentStoreState)
                }
            })
        }
    }

    function validForm() {
        return (email != "" && password != "");
    }

    //on page load
    useEffect(() => {
        console.log(currentStoreState)
        //localStorage.setItem("token", "");
        //currentStoreState.auth.isLoggedIn = false;
        //currentStoreState.auth.token = "";
        //setState(currentStoreState)
    });


    //render html
    return (
        <div>
            <div className="lContainer">
                <div className="lItem">
                    <div className="loginImage">
                        <img src={loginImg} width="300" style={{ position: 'relative' }} alt="login" />
                    </div>
                    <div className="loginForm">
                        <h2>Login</h2>
                        <Form className="login-form">
                            <FormItem>{
                                <div className="input-container">
                                    <UserOutlined type="user" className='login-txt-icon' style={{ color: "rgba(0,0,0,.25)" }} />
                                    <input value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        className="input-field" type="text" placeholder="Email" />
                                </div>
                            }
                            </FormItem>
                            <FormItem>{
                                <div className="input-container">
                                    <LockFilled type="lock" className='login-txt-icon' style={{ color: "rgba(0,0,0,.25)" }} />
                                    <input value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        className="input-field" type="password" placeholder="Password" />
                                </div>
                            }
                            </FormItem>
                            <FormItem>
                                <p style={{ "color": 'red', "textAlign": "center" }}>{loginMessage}</p>
                                <button className="login-button" onClick={handleLogin} disabled={!validForm}>
                                    Log in
                                </button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(getState, setState)(Login);