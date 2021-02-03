import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Drug.scss";
import SearchDrug from "../Components/SearchDrug";
import Button from 'react-bootstrap/Button';

function Drug() {
  const [drugs, setDrugs] = useState([]);
  const [searchDrug, setSearchDrug] = useState([]);

  function refreshPage() {
    window.location.reload(false);
  }

  const search = (userArr) => {
    setSearchDrug(userArr);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/drugs")
      .then((res) => {
        setDrugs(res.data);
        setSearchDrug(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

    const handleDelete = (id) => {

      axios
        .delete(`http://localhost:3000/drugs/${id}`)
        .then(res => {        
          console.log(res.data)

        })
        .catch(err => {
          console.log(err)
        })
    }

  return (
    <div className="drug">
      <h1>Search Drug</h1>

      <div className="search">
        <SearchDrug search={search} data={drugs} />
      </div>

      <table className="table table-striped table-nonfluid">
        <thead className="thead-dark">
          <tr>
            <th scope="col">NDC</th>
            <th scope="col">Drug Name</th>
            <th scope="col">Strength</th>
            <th scope="col">Non-Proprietary Name</th>
            <th scope="col">Dosage Form</th>
            <th scope="col">Delete</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
            {searchDrug.length === 0 ? (<tr><td className="error">Sorry, no results found!</td></tr>)
                : searchDrug.map((drug) => (
                <tr key={drug.id}>
                    <td>{drug.product_ndc}</td>
                    <td>{drug.drug_name}</td>
                    <td>{drug.strength}</td>
                    <td>{drug.npi}</td>
                    <td>{drug.dosage}</td>
                    <td><Button onClick={() => {handleDelete(drug.id); refreshPage();}}>Delete</Button></td>
                    <td><Button variant="secondary">Edit</Button></td>
                </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Drug;