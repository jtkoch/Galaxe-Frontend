import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const Register = () => {
    const history = useHistory();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        DOB: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "", 
        username: "",
        password: ""
    })

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const routeChange = () => {
        let path = '/Login'
        history.push(path)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("submitted", form)
        axios
            .post("http://localhost:9000/members", form)
            .then(response => {
                console.log(response)
                setForm(response.data)
                history.push('/Login')
            })
            .catch(error => {
                console.log("There has been an error", error)
            })
    }

    

    return (
        <div className="register-container">
            <h1 className="title">Register</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="first_name">
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="first_name" 
                        placeholder="Enter First Name" 
                        value={form.first_name} 
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="last_name">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="last_name" 
                        placeholder="Enter Last Name" 
                        value={form.last_name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="Dob">
                    <Form.Label>DOB:</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="dob" 
                        placeholder="Enter DOB" 
                        value={form.dob} 
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="Address_1">
                    <Form.Label>Address 1:</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="address_1" 
                        placeholder="Enter Address" 
                        value={form.address_1} 
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="Address_2">
                    <Form.Label>Address 2:</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="address_2" 
                        placeholder="Enter Address" 
                        value={form.address_2} 
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="City">
                    <Form.Label>City:</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="city" 
                        placeholder="Enter city" 
                        value={form.city} 
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="State">
                    <Form.Label>State:</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="state" 
                        placeholder="State" 
                        value={form.state} 
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="username">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        value={form.username} 
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={form.password} 
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" className="ml-5 mr-5" type="submit">
                    Register
                </Button>
                <Button variant="secondary" className="ml-5 mr-5" onClick={routeChange}>
                    Already Registered?
                </Button>
            </Form>
        </div>
    )
}

export default Register