import React from 'react';
import '../../App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class MyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState("show", false);
    }

    componentDidMount() {
        this.setState({ data: this.props.data });
    }

    render() {
        return (
            <>
                <Modal show={this.props.show} animation={false}>
                    <Modal.Header>
                        <Modal.Title>User Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="" style={{ textAlign: "center" }}>
                            <div className="">
                                <img src={this.state.data.profilepicture} alt="Avatar" style={{ width: "45%" }} />
                                <hr />
                                <div className="container">
                                    <h4><b>Name: {this.state.data.name}</b></h4>
                                    <p>Email: {this.state.data.email}</p>
                                    <p>Location: {this.state.data.location}</p>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.close}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
export default MyModal;