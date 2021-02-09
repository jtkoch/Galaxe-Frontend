import React, {useState} from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom';

const SearchForm = (props) => {
    const history = useHistory()
    const [results, setResults] = useState()

    function refreshPage() {
        window.location.reload(false);
    }

    const handleChange = event => {
        setResults(event.target.value)
    }

    const routeChange = () => {
        let path="/AddMembership";
        history.push(path);
      }

    const submitHandler = event => {
        event.preventDefault();

        const userSearch = props.data.filter(user => {
            return (
                user.firstName.toLowerCase().indexOf(results.toLowerCase()) !== -1 ||
                user.lastName.toLowerCase().indexOf(results.toLowerCase()) !== -1
            )
        })

        props.search(userSearch)
        console.log(userSearch)
    }

    return (
        <div className="search-form">
            <Form onSubmit={submitHandler}>
                <Form.Control 
                    onChange={handleChange}
                    type="search"
                    name="search"
                    id="user"
                    placeholder="Search"
                ></Form.Control>
                
                <Button type="submit" className="m-3">Search</Button>
                <Button onClick={refreshPage} variant="secondary" className="m-3">Reset List</Button>
                <Button variant="secondary" className="ml-5 mr-5" onClick={routeChange}>Add Member</Button>
            </Form>
        </div>
    )
}

export default SearchForm