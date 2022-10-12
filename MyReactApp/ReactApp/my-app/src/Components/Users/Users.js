import React, { useState, useEffect } from 'react';
import '../../Assets/Css/default.css'
import { GET, DELETE } from '../../Infrastructure/HttpCalls/Axios.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { EditFilled, DeleteFilled, EyeFilled } from '@ant-design/icons';
import Swal from 'sweetalert2'
import Header from '../Common/header.js';
import MyModal from '../Common/MyModal.jsx';
import { UserModel } from "../../Models/User.js";


function Users() {

    //declare method variables
    const navigate = useNavigate();

    //declare private variables
    var selectedUser = UserModel;
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewUserDetails, setViewUserDetails] = useState(false);
    const [currentUser, setCurrentUser] = useState(selectedUser);

    //declare functions
    function getUsers() {
        GET("http://restapi.adequateshop.com/api/users?page=" + currentPage).then((result) => {
            setUsers(result.data.data);
            setTotalPages(result.data.total_pages)
        })
    }

    const handlePageChange = page => {
        setCurrentPage(page)
    }

    function handleEdit(id) {
        navigate('/user/' + id);
    }

    function handleDelete(id) {
        Swal.fire({
            title: 'Do you want to delete this user ?',
            showDenyButton: true,
            showConfirmButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {
            console.log(result)
            if (result.isConfirmed) {
                DELETE("http://restapi.adequateshop.com/api/users/" + id).then((result) => {
                    console.log(result)
                    getUsers();
                })
            }
        })
    }

    function handleView(data) {
        setCurrentUser(prevUser => ({
            ...prevUser,
            data
        }));

        setViewUserDetails(true);
    }

    //on page load
    useEffect(() => {
        getUsers();
    }, [currentPage]);

    //declare datatable columns
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            width: "42%"
        },
        {
            name: 'Email',
            selector: row => row.email,
            width: "42%"
        },
        {
            cell: (row) => {
                return (
                    <button className='icon-btn icon-blue' onClick={() => { handleView(row) }}>
                        <EyeFilled type="user" />
                    </button>
                )
            },
            width: "5%",
            name: 'View',

        },
        {
            cell: (row) => {
                return (
                    <button className='icon-btn icon-blue' onClick={() => { handleEdit(row.id) }}>
                        <EditFilled type="user" />
                    </button>
                )
            },
            width: "5%",
            name: 'Edit',

        },
        {
            cell: (row) => {
                return (
                    <button className='icon-btn icon-red' onClick={() => { handleDelete(row.id) }}>
                        <DeleteFilled type="user" />
                    </button>
                )
            },
            width: "6%",
            name: 'Delete',
        }
    ];

    //render html
    return (
        <div>
            <Header />
            <Container className='user-container'>
                <h4 className='pull-left'>Users</h4>
                <hr />
                <Row>
                    <DataTable id="dtUsers"
                        columns={columns}
                        data={users}
                        pagination
                        paginationServer
                        paginationTotalRows={50}
                        paginationComponentOptions={{ noRowsPerPage: true }}
                        onChangePage={handlePageChange}
                    />
                </Row>
            </Container>

            <MyModal data={currentUser} show={viewUserDetails} close={() => setViewUserDetails(false)} />
        </div>
    )
}

export default Users;