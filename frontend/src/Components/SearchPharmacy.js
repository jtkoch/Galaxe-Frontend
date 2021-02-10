import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom"

const SearchPharmacy = (props) => {
  const history = useHistory()
  const [results, setResults] = useState([]);

  const routeChange = () => {
    let path = "/addPharmacy";
    history.push(path);
}

  function refreshPage() {
    window.location.reload(false);
  }

  const handleChange = (event) => {
    setResults(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const pharmacySearch = props.data.filter((pharmacy) => {
      return (
        pharmacy.zipcode.toString().indexOf(results) !== -1
      );
    });

    props.search(pharmacySearch);
    console.log(pharmacySearch);
  };

  return (
    <div className="search-form">
      <Form onSubmit={submitHandler}>
        <Form.Control
          onChange={handleChange}
          type="number"
          name="search"
          id="user"
          placeholder="Search by Zipcode"
        ></Form.Control>

        <Button type="submit" className="m-3">
          Search
        </Button>
        <Button onClick={refreshPage} variant="secondary" className="m-3">
          Reset List
        </Button>
        <Button onClick={routeChange}>Add Pharmacy</Button>
      </Form>
    </div>
  );
};

export default SearchPharmacy;
