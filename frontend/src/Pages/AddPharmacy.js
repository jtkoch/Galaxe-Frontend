import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddPharmacy = () => {
    const history = useHistory();

    const [form, setForm] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        npi: ""
    });

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const routeChange = () => {
        let path = "/Pharmacy";
        history.push(path);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submitted", form);
        axios
            .post("http://localhost:8080/addPharmacy", form)
            .then((response) => {
                console.log(response);
                localStorage.setItem("token", response.data.token);
                setForm(response.data);
                history.push("/Pharmacy");
            })
            .catch((error) => {
                console.log("There has been an error", error);
            });
    };

    return (
        <div className="register-container">
            <Form onSubmit={handleSubmit} className="p-5">
                <Form.Group controlId="pharmacyName">
                    <Form.Label>Pharmacy Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter Pharmacy Name"
                        value={form.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        placeholder="Enter Address"
                        value={form.address}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        name="city"
                        placeholder="Enter City"
                        value={form.city}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        type="text"
                        name="state"
                        placeholder="Enter State"
                        value={form.state}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        name="country"
                        placeholder="Enter Country"
                        value={form.country}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="zipCode">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                        type="number"
                        name="zipCode"
                        placeholder="Enter Zip Code"
                        value={form.zipCode}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="npi">
                    <Form.Label>NPI</Form.Label>
                    <Form.Control
                        type="number"
                        name="npi"
                        placeholder="Enter NPI"
                        value={form.npi}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" className="ml-5 mr-5" type="submit">
                    Add Pharmacy
        </Button>
                <Button variant="secondary" className="ml-5 mr-5" onClick={routeChange}>
                    Cancel
        </Button>
            </Form>
        </div>
    );
};

export default AddPharmacy;