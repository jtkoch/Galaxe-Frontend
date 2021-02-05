import React, {useState} from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SearchForm = (props) => {
    const [results, setResults] = useState()

    function refreshPage() {
        window.location.reload(false);
    }

    const handleChange = event => {
        setResults(event.target.value)
    }

    const submitHandler = event => {
        event.preventDefault();

        const userSearch = props.data.filter(user => {
            return (
                user.firstName.toLowerCase().indexOf(results.toLowerCase()) !== -1 ||
                user.lastName.toLowerCase().indexOf(results.toLowerCase()) !== -1 || 
                user.memberID.toLowerCase().indexOf(results.toLowerCase()) !== -1 || 
                user.address.toLowerCase().indexOf(results.toLowerCase()) !== -1
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
            </Form>
            
        </div>
    )
}

export default SearchForm