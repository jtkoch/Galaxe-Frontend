import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SearchForm from '../Components/SearchForm'
import '../Styles/Membership.scss'

function Membership() {
    const [data, setData] = useState([])
    const [searchForm, setSearchForm] = useState([])

    const search = userArr => {
        setSearchForm(userArr)
    }

    useEffect(() => {
        axios 
            .get("http://localhost:3000/data")
            .then(res => {
                setData(res.data)
                setSearchForm(res.data)
            })
            .catch(error => 
                {console.log('error', error)
            })
    }, [])

    return (
        <div className="membership">
            <h1>Search Member</h1>

            <div className="search">
                <SearchForm search={search} data={data} />
            </div>
            
            <table className="table table-striped table-nonfluid">
                <thead  className="thead-dark">
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Member ID</th>
                        <th scope="col">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {searchForm.length === 0 ? (<h1 className="error">Sorry, no results found!</h1>)
                        : searchForm.map((user) => (
                            <tr key={user.id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.memberID}</td>
                                <td>{user.address}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Membership