import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchForm from "../Components/SearchForm";
import "../Styles/Drug.scss";
import SearchDrug from "../Components/SearchDrug";

function Drug() {
  const [drugs, setDrugs] = useState([]);

  const [searchDrug, setSearchDrug] = useState([]);

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

  return (
    <div className="drug">
      <h1>Search Drug</h1>

      <div className="search">
        <SearchDrug search={search} data={drugs} />
      </div>

      <table className="table table-striped table-bordered table-nonfluid">
        <thead className="thead-dark">
          <tr>
            <th scope="col">NDC</th>
            <th scope="col">Drug Name</th>
            <th scope="col">Strenght</th>
            <th scope="col">Non-Proprietary Name</th>
            <th scope="col">Dosage Form</th>
          </tr>
        </thead>
        <tbody>
          {searchDrug.map((drug) => (
            <tr key={drug.id}>
              <td>{drug.product_ndc}</td>
              <td>{drug.drug_name}</td>
              <td>{drug.strength}</td>
              <td>{drug.npi}</td>
              <td>{drug.dosage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Drug;
