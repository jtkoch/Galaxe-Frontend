import React, { useState, useEffect  } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";

const EditDrug = (props) => {
  const history = useHistory();
  const [form, setForm] = useState({
    drugName: "",
    nationalDrugCode: "",
    drugStrength: "",
    genericCodeNum: "",
    unitOfMeasurement: "",
    dosage: "",
  });

  useEffect(() => {
    let drugId = props.match.params.id

    axios
      .get(`http://localhost:9000/drug/${drugId}`)
      .then((res) => {
        setForm(res.data)
      })
      .catch((error) => {
        console.log("error", error)
      })
  }, [props.match.params.id])

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const routeChange = () => {
    let path = "/Drug";
    history.push(path);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted", form);
    axios
      .put(`http://localhost:9000/update/${form.id}`, form)
      .then((response) => {
        console.log(response);
        setForm(response.data);
        history.push("/Drug");
      })
      .catch((error) => {
        console.log("There has been an error", error);
      });
  };

  return (
    <div className="register-container">
      <Form onSubmit={handleSubmit} className="p-5">
        <Form.Group controlId="drugName">
          <Form.Label>Drug Name</Form.Label>
          <Form.Control
            type="text"
            name="drugName"
            placeholder="drug name"
            value={form.drugName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="nationalDrugCode">
          <Form.Label>National Drug Code</Form.Label>
          <Form.Control
            type="text"
            name="nationalDrugCode"
            placeholder="Enter National Drug Code"
            value={form.nationalDrugCode}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="drugStrength">
          <Form.Label>Drug Strength</Form.Label>
          <Form.Control
            type="text"
            name="drugStrength"
            placeholder="Enter Drug Strength"
            value={form.drugStrength}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="genericCodeNum">
          <Form.Label>Generic CodeNum</Form.Label>
          <Form.Control
            type="text"
            name="genericCodeNum"
            placeholder="Enter Generic CodeNum"
            value={form.genericCodeNum}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="unitOfMeasurement">
          <Form.Label>Unit Of Measurement</Form.Label>
          <Form.Control
            type="text"
            name="unitOfMeasurement"
            placeholder="Enter Unit Of Measurement"
            value={form.unitOfMeasurement}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="dosage">
          <Form.Label>Dosage</Form.Label>
          <Form.Control
            type="text"
            name="dosage"
            placeholder="Enter Dosage"
            value={form.dosage}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" className="ml-5 mr-5" type="submit">
          Submit
        </Button>
        <Button variant="secondary" className="ml-5 mr-5" onClick={routeChange}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default EditDrug;