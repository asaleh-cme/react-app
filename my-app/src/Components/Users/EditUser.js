import React, { useState, useEffect } from 'react';
import '../../Assets/Css/default.css'
import { GET } from '../../Infrastructure/HttpCalls/Axios.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Header from '../Common/header.js';
import { useParams } from "react-router-dom";
import { UserModel } from "../../Models/User.js";
import { connect } from 'react-redux';
import { getState, setState } from '../Common/ReduxStore.js'

 function EditUser(props) {

    //declare method variables
    const navigate = useNavigate();
    const params = useParams();

    //declare private variables
    var selectedUser = UserModel;
    const [user, setUser] = useState(selectedUser);

    //declare functions
    function getUser() {
        GET("http://restapi.adequateshop.com/api/users/" + params.id).then((result) => {
            selectedUser.id = result.data.id;
            selectedUser.name = result.data.name;
            selectedUser.email = result.data.email;
            selectedUser.profilepicture = result.data.profilepicture;
            selectedUser.location = result.data.location;

            setUser(prevUser => ({
                ...prevUser,
                selectedUser
            }));
        })
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    function handleCancel() {
        navigate("/users")
    }

    function handleSave() {
        GET(("http://restapi.adequateshop.com/api/users/" + params.id), user).then((result) => {
            navigate("/users")
        })
    }

    //on page load
    useEffect(() => {
        getUser();
    }, []);


    //render html
    return (
        <div>
            <Header />
            <Container className='user-container'>
                <div className="container rounded bg-white mt-5">
                    <div className="row profile-card">
                        <div className="col-md-4 border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" src={user.profilepicture} width="90" /><span className="font-weight-bold">Images will not be changed since api server does not support upload image api</span></div>
                        </div>
                        <div className="col-md-8">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex flex-row align-items-center back"><i className="fa fa-long-arrow-left mr-1 mb-1"></i>
                                        <h6></h6>
                                    </div>
                                    <h6 className="text-right">Edit Profile</h6>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <label className='pull-left wd-100'>Name</label>
                                        <input type="text" name="name" className="form-control" value={user.name} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className='pull-left wd-100'>Email</label>
                                        <input type="text" name="email" className="form-control" value={user.email} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label className='pull-left wd-100'>Location</label>
                                        <input type="text" name="location" className="form-control" value={user.location} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className='modal-footer'>
                                    <div className="mt-5 mr-2 text-right"><button className="btn btn-primary profile-button" type="button" onClick={handleSave}>Save Profile</button></div>
                                    <div className="mt-5 text-right"><button className="btn btn-secondary profile-button" type="button" onClick={handleCancel}>Cancel</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default connect(getState, setState)(EditUser);