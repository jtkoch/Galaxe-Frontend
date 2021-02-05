import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Drug.scss";
import SearchDrug from "../Components/SearchDrug";
import Button from "react-bootstrap/Button";
import { Redirect, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import EditDrug from "./EditDrug";


function Drug() {
  const [drugs, setDrugs] = useState([]);
  const [searchDrug, setSearchDrug] = useState([]);
  const history = useHistory();

  // Redirect <EditDrug />;

  function refreshPage() {
    window.location.reload(false);
  }

  const search = (userArr) => {
    setSearchDrug(userArr);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/drugs")
      .then((res) => {
        setDrugs(res.data);
        setSearchDrug(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handleEdit = (drug) => {
    localStorage.setItem("drug", drug);
    console.log(localStorage.getItem(drug.id));
    let path = "/EditDrug";
    history.push(drug);
    history.push(path);
    
    EditDrug ={ 
      drugName: PropTypes.string.isRequired
    };
  
    EditDrug.defaultProps = {
      drugName: drug.drugName
    };
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/delete/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="drug">
      <h1>DRUGS</h1>

      <div className="search">
        <SearchDrug search={search} data={drugs} />
      </div>

      <table className="table table-striped table-nonfluid">
        <thead className="thead-dark">
          <tr>
            <th scope="col">NDC</th>
            <th scope="col">Drug Name</th>
            <th scope="col">Strength</th>
            <th scope="col">Unit Of Measurement</th>
            <th scope="col">Dosage Form</th>
            <th scope="col">Delete</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {searchDrug.length === 0 ? (
            <tr>
              <td className="error">Sorry, no results found!</td>
            </tr>
          ) : (
            searchDrug.map((drug) => (
              <tr key={drug.id}>
                <td>{drug.nationalDrugCode}</td>
                <td>{drug.drugName}</td>
                <td>{drug.drugStrength}</td>
                <td>{drug.unitOfMeasurement}</td>
                <td>{drug.dosage}</td>
                <td>
                  <Button
                    onClick={() => {
                      handleDelete(drug.id);
                      refreshPage();
                    }}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleEdit(drug);
                      drug = { drug };
                      console.log(localStorage.getItem(drug));
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Drug;
