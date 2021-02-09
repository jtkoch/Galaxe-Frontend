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
        dob: '',
        address_1: '',
        address_2: '',
        city: '',
        state: ''
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
            .post("http://localhost:9000/members", memberForm)
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
                <Form.Group controlId="dob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="text"
                        name="dob"
                        placeholder="Enter Date of Birth"
                        value={memberForm.dob}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="address_1">
                    <Form.Label>Address 1</Form.Label>
                    <Form.Control
                        type="text"
                        name="address_1"
                        placeholder="Enter Address 1"
                        value={memberForm.address_1}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="address_2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control
                        type="text"
                        name="address_2"
                        placeholder="Enter Address 2"
                        value={memberForm.address_2}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        name="city"
                        placeholder="Enter City"
                        value={memberForm.city}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        type="text"
                        name="state"
                        placeholder="Enter State"
                        value={memberForm.state}
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
