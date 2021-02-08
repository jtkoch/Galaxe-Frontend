import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const AddMembership = () => {
    const history = useHistory();

    const [memberForm, setMemberForm] = useState({
        firstName: '',
        lastName: '',
        memberId: '',
        address: ''
    });

    const handleChange = (event) => {
        setMemberForm({ ...memberForm, [event.target.name]: event.target.value });
    };

    const routeChange = () => {
        let path = "/Membership";
        history.push(path);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted", memberForm);
        axios
            .post("", memberForm)
            .then((response) => {
                console.log(response);
                localStorage.setItem("token", response.data.token);
                setMemberForm(response.data);
                history.push("/Membership");
            })
            .catch((error) => {
                console.log("There has been an error", error);
            }
        );
    };

    return (
        <div className="register-container">
            <Form onSubmit={handleSubmit} className="p-5">
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="Enter First Name"
                        value={memberForm.firstName}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Enter Last Name"
                        value={memberForm.lastName}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="memberId">
                    <Form.Label>Member ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="memberId"
                        placeholder="Enter Member ID"
                        value={memberForm.memberId}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        placeholder="Enter Address"
                        value={memberForm.address}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" className="ml-5 mr-5" type="submit">
                Add Member
                </Button>
                <Button variant="secondary" className="ml-5 mr-5" onClick={routeChange}>
                Cancel
                </Button>
            </Form>
        </div>
    );
}

export default AddMembership;