import React, { useState, useEffect } from "react"
import axios from "axios"
import "../Styles/Drug.scss"
import SearchDrug from "../Components/SearchDrug"
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom"

function Drug() {
  const [drugs, setDrugs] = useState([])
  const [searchDrug, setSearchDrug] = useState([])
  const history = useHistory()

  function refreshPage() {
    window.location.reload(false)
  }

  const search = (userArr) => {
    setSearchDrug(userArr)
  }

  useEffect(() => {
    axios
      .get("http://localhost:9000/drugs")
      .then((res) => {
        setDrugs(res.data)
        setSearchDrug(res.data)
      })
      .catch((error) => {
        console.log("error", error)
      })
  }, [])

  const handleEdit = (id) => {
    let path = `/EditDrug/${id}`
    history.push(path)    
  }

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:9000/delete/${id}`)
      .then(res => {        
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="drug">
      <h1>Drugs</h1>

      <div className="search">
        <SearchDrug search={search} data={drugs} />
      </div>

      <table className="table table-striped table-nonfluid">
        <thead className="thead-dark">
          <tr>
            <th scope="col">NDC</th>
            <th scope="col">Drug Name</th>
            <th scope="col">Strength</th>
            <th scope="col">Generic Code Number</th>
            <th scope="col">Unit of Measurement</th>
            <th scope="col">Dosage Form</th>
            <th scope="col">Actions</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
            {searchDrug.length === 0 ? (<tr><td className="error">Sorry, no results found!</td></tr>)
                : searchDrug.map((drug) => (
                <tr key={drug.id}>
                    <td>{drug.nationalDrugCode}</td>
                    <td>{drug.drugName}</td>
                    <td>{drug.drugStrength}</td>
                    <td>{drug.genericCodeNum}</td>
                    <td>{drug.unitOfMeasurement}</td>
                    <td>{drug.dosage}</td>
                    <td><Button onClick={() => {handleDelete(drug.id); refreshPage();}}>Delete</Button></td>
                    <td><Button onClick={() => {handleEdit(drug.id)}} variant="secondary">Edit</Button></td>
                </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Drug
