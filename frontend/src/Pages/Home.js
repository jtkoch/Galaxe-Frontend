import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {useHistory} from 'react-router-dom'

function Home(props) {
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [show, setShow] = useState(true)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [user, setUser] = useState();

    const routeChange = () => {
        let path = '/Register'
        history.push(path)
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          localStorage.clear()
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
      }, []);
    
      // logout the user
      const handleLogout = () => {
        setUser({});
        setUsername("");
        setPassword("");
        localStorage.clear();
        let path = '/Register'
        history.push(path)
      };


    // login the user
    const handleSubmit = async e => {
        e.preventDefault();
        const user = { username, password };
        // send the username and password to the server
        const response = await axios.post(
        "http://localhost:9000/members",
        user
        );
        // set the state of the user
        setUser(response.data);
        // store the user in localStorage
        localStorage.setItem("user", JSON.stringify(response.data));
    };

    // if there's a user show the message below
    if (user) {
        return (
          <div className="home-container">
            <div className="logout-container">
                <Button className="logout" onClick={handleLogout}>logout</Button>
            </div>
            <h1 className="title">Home</h1>
            <p className="welcome">Welcome, {username}</p>
            <div className="mid">
              <h1>About Our Services</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        );
    }
    

    return (
        <div className="home-container">
            <div className="login-button">
                <Button onClick={handleShow}>Login</Button>
            </div>
            <h1 className="title">Home</h1>

            <div className="mid">
                <h1>About Our Services</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
                    in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>

            <div>
                <Modal 
                    show={show} 
                    onHide={handleClose}
                    size="lg"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="login-container">
                        <Form onSubmit={handleSubmit} className="p-5">
                            <Form.Group size="lg" controlId="username">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="username"
                                    placeholder="Enter Username" 
                                    value={username}
                                    onChange={({ target }) => setUsername(target.value)}
                                />
                            </Form.Group>

                            <Form.Group size="lg" controlId="password">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={({ target }) => setPassword(target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" className="m-1" type="submit">
                                Submit
                            </Button>
                            <Button variant="secondary" className="m-1" onClick={routeChange}>
                                Not Registered?
                            </Button>
                            <Button onClick={handleClose} className="m-1">Close</Button>
                        </Form>
                    </div>
                </Modal.Body>

                </Modal>
            </div>
        </div>
    )
}

export default Home