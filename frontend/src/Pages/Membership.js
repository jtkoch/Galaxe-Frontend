import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SearchForm from '../Components/SearchForm'
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import "../Styles/Membership.css";

function Membership() {
    const [member, setMember] = useState([])
    const [searchForm, setSearchForm] = useState([])
    const history = useHistory();

    function refreshPage() {
        window.location.reload(false);
    }

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

    const handleEdit = (id) => {
        let path=`/EditMembership/${id}`;
        history.push(path);
      }

    const handleDelete = (id) => {
        axios
          .delete(`http://localhost:3000/data/${id}`)
          .then(res => {        
            console.log(res.data)
          })
          .catch(err => {
            console.log(err)
          })
      }

    return (
        <div className="membership">
            <h1>Search Member</h1>

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
                        <th scope="col">Delete</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {searchForm.length === 0 ? (<tr><td className="error">Sorry, no members found!</td></tr>)
                        : searchForm.map((user) => (
                            <tr key={user.id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.dob}</td>
                                <td>{user.address_1}</td>
                                <td>{user.address_2}</td>
                                <td>{user.city}</td>
                                <td>{user.state}</td>
                                <td><Button onClick={() => {handleDelete(user.id); refreshPage();}}>Delete</Button></td>
                                <td><Button variant="secondary" onClick={() => {handleEdit(user.id)}}>Edit</Button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Membership