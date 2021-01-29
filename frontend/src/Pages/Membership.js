import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Membership() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios 
            .get("http://localhost:3000/data")
            .then(res => {
                setData(res.data)
            })
    }, [])

    return (
        <div className="membership">
            <h1>Search Member</h1>

            <div className="search">
                <input type="text" placeholder="Search" />
                <button>Search</button>
            </div>
            
            
            <table className="table table-striped table-bordered table-nonfluid">
                <thead  className="thead-dark">
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Member ID</th>
                        <th scope="col">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((user) => (
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