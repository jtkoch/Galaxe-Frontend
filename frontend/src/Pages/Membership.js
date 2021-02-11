import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SearchForm from '../Components/SearchForm'

function Membership() {
    const [member, setMember] = useState([])
    const [searchForm, setSearchForm] = useState([])

    const search = userArr => {
        setSearchForm(userArr)
    }

    useEffect(() => {
        axios 
            .get("http://localhost:9000/members")
            .then(res => {
                setMember(res.data)
                setSearchForm(res.data)
            })
            .catch(error => 
                {console.log('error', error)
            })
    }, [])

    return (
        <div className="membership">
            <h1 className="title">Search Member</h1>

            <div className="search">
                <SearchForm search={search} data={member} />
            </div>
            
            <table className="table table-striped table-nonfluid">
                <thead  className="thead-dark">
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Date of Birth</th>
                        <th scope="col">Address 1</th>
                        <th scope="col">Address 2</th>
                        <th scope="col">City</th>
                        <th scope="col">State</th>
                    </tr>
                </thead>
                <tbody>
                    {searchForm.length === 0 ? (<tr><td className="error">Sorry, no members found!</td></tr>)
                        : searchForm.map((user) => (
                            <tr key={user.id}>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.dob}</td>
                                <td>{user.address_1}</td>
                                <td>{user.address_2}</td>
                                <td>{user.city}</td>
                                <td>{user.state}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Membership