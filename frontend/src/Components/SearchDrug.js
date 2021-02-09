import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom"

const SearchDrug = (props) => {
  const history = useHistory()
  const [results, setResults] = useState([]);

  const routeChange = () => {
    let path = "/AddDrug";
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

    const drugSearch = props.data.filter((drug) => {
      return (
        drug.nationalDrugCode.toString().indexOf(results) !== -1
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
        <Button onClick={routeChange}>Add Drug</Button>
      </Form>
    </div>
  );
};

export default SearchDrug;
