import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from 'react-router-dom';

const SearchDrug = (props) => {
  const [results, setResults] = useState();
  const history = useHistory();

  function refreshPage() {
    window.location.reload(false);
  }

  const handleChange = (event) => {
    setResults(event.target.value);
  };

  const routeChange = () => {
    let path="/AddDrug";
    history.push(path);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const drugSearch = props.data.filter((drug) => {
      return (
        drug.nationalDrugCode.toLowerCase().indexOf(results.toLowerCase()) !== -1
      );
    });

    props.search(drugSearch);
    console.log(drugSearch);
  };

  return (
    <div className="search-form">
      <Form onSubmit={submitHandler}>
        <Form.Control
          onChange={handleChange}
          type="number"
          name="search"
          id="user"
          placeholder="Search by NDC"
        ></Form.Control>

        <Button type="submit" className="m-3">
          Search
        </Button>
        <Button onClick={refreshPage} variant="secondary" className="m-3">
          Reset List
        </Button>
        <Button variant="secondary" className="ml-5 mr-5" onClick={routeChange}>
          Add Drug
        </Button>
      </Form>
    </div>
  );
};

export default SearchDrug;