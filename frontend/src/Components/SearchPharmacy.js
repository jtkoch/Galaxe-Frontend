import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

const SearchPharmacy = (props) => {
  const [results, setResults] = useState([]);
  const history = useHistory();

  function refreshPage() {
    window.location.reload(false);
  }

  const handleChange = (event) => {
    setResults(event.target.value);
  };

  const routeChange = () => {
    let path = "/AddPharmacy";
    history.push(path);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const userSearch = props.data.filter((pharmacy) => {
        return pharmacy.zipCode.toString().indexOf(results) !== -1;
    });

    props.search(userSearch);
    console.log(userSearch);
  };

  return (
    <div className="search-form">
      <Form onSubmit={submitHandler}>
        <Form.Control
          onChange={handleChange}
          type="number"
          name="search"
          id="zipCode"
          placeholder="search pharmacy by zip"
        ></Form.Control>

        <Button type="submit" className="m-3">
          Search
        </Button>
        <Button onClick={refreshPage} variant="secondary" className="m-3">
          Reset List
        </Button>
        <Button variant="secondary" className="ml-5 mr-5" onClick={routeChange}>
          Add Pharmacy
        </Button>
      </Form>
    </div>
  );
};

export default SearchPharmacy;
