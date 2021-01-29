import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const Login = () => {
    const history = useHistory();

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value})
    }

    const routeChange = () => {
        let path = '/Register'
        history.push(path)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("submitted", user)
        axios
            .post("http://localhost:3000/data", user)
            .then(response => {
                console.log(response)
                localStorage.setItem('token', response.data.token)
                setUser(response.data)
                history.push('/Home')
            })
            .catch(error => {
                console.log("There has been an error", error)
            })
    }

    

    return (
        <div className="login-container">
            <Form onSubmit={handleSubmit} className="p-5">
                <Form.Group size="lg" controlId="username">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control 
                        type="username" 
                        name="username"
                        placeholder="Enter username" 
                        value={user.username}
                        onChange={(event) => handleChange(event)}
                    />
                </Form.Group>

                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(event) => handleChange(event)} 
                    />
                </Form.Group>
                <Button variant="primary" className="ml-5 mr-5" type="submit">
                    Login
                </Button>
                <Button variant="secondary" className="ml-5 mr-5" onClick={routeChange}>
                    Not Registered?
                </Button>
            </Form>
        </div>
    )
}

export default Login