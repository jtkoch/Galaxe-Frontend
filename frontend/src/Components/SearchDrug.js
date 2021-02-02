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

    const drugSearch = props.data.filter((drug) => {
      return (
        drug.product_ndc.toLowerCase().indexOf(results.toLowerCase()) !== -1
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
      </Form>
    </div>
  );
};

export default SearchDrug;