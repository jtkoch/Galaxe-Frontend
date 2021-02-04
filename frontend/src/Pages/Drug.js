import React, { useState, useEffect } from "react";
import axios from "axios";
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
      .get("http://localhost:8081/drugs")
      .then((res) => {
        setDrugs(res.data);
        setSearchDrug(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  //   window.editor = SwaggerEditor({
  //     dom_id: "#swagger-editor",
  //     layout: "EditorLayout",
  //     plugins: Object.values(plugins),
  //     swagger2GeneratorUrl: "https://generator.swagger.io/api/swagger.json",
  //     oas3GeneratorUrl: "https://generator3.swagger.io/openapi.json",
  //     swagger2ConverterUrl: "https://converter.swagger.io/api/convert",
  //   });

  return (
    <div className="drug">
      <h1>DRUGS</h1>

      <div id="swagger-editor"></div>

      <div className="search">
        <SearchDrug search={search} data={drugs} />
      </div>

      <table className="table table-striped table-bordered table-nonfluid">
        <thead className="thead-dark">
          <tr>
            <th scope="col">NDC</th>
            <th scope="col">Drug Name</th>
            <th scope="col">Strenght</th>
            <th scope="col">Generic Code Number</th>
            <th scope="col">Dosage Form</th>
          </tr>
        </thead>
        <tbody>
          {searchDrug.map((drug) => (
            <tr key={drug.id}>
              <td>{drug.nationalDrugCode}</td>
              <td>{drug.drugName}</td>
              <td>{drug.drugStrength}</td>
              <td>{drug.genericCodeNum}</td>
              <td>{drug.dosage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Drug;
