import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const Register = () => {
    const history = useHistory();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        memberID: "",
        address: "",
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
            .post("http://localhost:3000/data", form)
            .then(response => {
                console.log(response)
                localStorage.setItem('token', response.data.token)
                setForm(response.data)
                history.push('/Login')
            })
            .catch(error => {
                console.log("There has been an error", error)
            })
    }

    

    return (
        <div className="register-container">
            <Form onSubmit={handleSubmit} className="p-5">
                <Form.Group controlId="FirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="firstName" 
                        placeholder="Enter First Name" 
                        value={form.firstName} 
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="LastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="lastName" 
                        placeholder="Enter Last Name" 
                        value={form.lastName}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="Dob">
                    <Form.Label>dob</Form.Label>
                    <Form.Control 
                        type="date" 
                        name="dob" 
                        placeholder="Enter dob" 
                        value={form.dob} 
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="MemberID">
                    <Form.Label>Member ID</Form.Label>
                    <Form.Control 
                        type="number" 
                        name="memberID" 
                        placeholder="Enter Member ID" 
                        value={form.memberID} 
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="Address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="address" 
                        placeholder="Enter Address" 
                        value={form.address} 
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="Username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="username" 
                        placeholder="Enter username" 
                        value={form.username} 
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="Password">
                    <Form.Label>Password</Form.Label>
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