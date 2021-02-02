import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SearchDrug = (props) => {
  const [results, setResults] = useState();

  function refreshPage() {
    window.location.reload(false);
  }

  const handleChange = (event) => {
    setResults(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const userSearch = props.data.filter((drug) => {
      return (
        drug.product_ndc.toLowerCase().indexOf(results.toLowerCase()) !== -1
      );
    });

    props.search(userSearch);
    console.log(userSearch);
  };

  return (
    <div className="search-form">
      <Form onSubmit={submitHandler}>
        <Form.Control
          onChange={handleChange}
          type="text"
          name="search"
          id="user"
          placeholder="Search"
        ></Form.Control>

        <Button type="submit" className="m-3">
          Search
        </Button>
        <Button onClick={refreshPage} variant="secondary" className="m-3">
          Reset List
        </Button>
      </Form>
    </div>
  );
};

export default SearchDrug;
