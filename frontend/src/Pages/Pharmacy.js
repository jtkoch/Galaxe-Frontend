import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Button from "react-bootstrap/Button"
import { useHistory } from "react-router-dom"
import SearchPharmacy from '../Components/SearchPharmacy'
import Map from '../Components/Map'

function Pharmacy() {
    const [pharmacy, setPharmacy] = useState([])
    const [searchPharmacy, setSearchPharmacy] = useState([])
    const history = useHistory()

    function refreshPage() {
      window.location.reload(false)
    }

    const search = userArr => {
        setSearchPharmacy(userArr)
    }

    useEffect(() => {
        axios 
            .get("http://localhost:9191/pharmacies")
            .then(res => {
                setPharmacy(res.data)
                setSearchPharmacy(res.data)
            })
            .catch(error => 
                {console.log('error', error)
            })
    }, [])

    const handleEdit = (id) => {
        let path = `/EditPharmacy/${id}`
        history.push(path)    
      }
    
      const handleDelete = (id) => {
        axios
          .delete(`http://localhost:9191/deletePharmacy/${id}`)
          .then(res => {        
            console.log(res.data)
          })
          .catch(err => {
            console.log(err)
          })
      }

    return (
        <div className="pharmacy">
            <h1 className="title">Pharmacies</h1>
            
            <div className="search">
                <p>Need to find a pharmacy near you?</p>
                <SearchPharmacy search={search} data={pharmacy} />
            </div>
            
            <table className="table table-striped table-nonfluid">
                <thead  className="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">City</th>
                        <th scope="col">State</th>
                        <th scope="col">Country</th>
                        <th scope="col">Zipcode</th>
                        <th scope="col">NPI</th>
                        <th scope="col">Actions</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {searchPharmacy.length === 0 ? (<tr><td className="error">Sorry, no pharmacies found!</td></tr>)
                        : searchPharmacy.map((pharmacy) => (
                            <tr key={pharmacy.id}>
                                <td>{pharmacy.name}</td>
                                <td>{pharmacy.address}</td>
                                <td>{pharmacy.city}</td>
                                <td>{pharmacy.state}</td>
                                <td>{pharmacy.country}</td>
                                <td>{pharmacy.zipCode}</td>
                                <td>{pharmacy.npi}</td>
                                <td><Button onClick={() => {handleDelete(pharmacy.id); refreshPage();}}>Delete</Button></td>
                                <td><Button onClick={() => {handleEdit(pharmacy.id)}} variant="secondary">Edit</Button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Map/>
        </div>
    )
}

export default Pharmacy