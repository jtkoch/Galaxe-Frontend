import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchForm from "../Components/SearchForm";
import Button from "react-bootstrap/Button";

function Membership() {
  const [data, setData] = useState([]);
  const [searchForm, setSearchForm] = useState([]);

  function refreshPage() {
    window.location.reload(false);
  }

  const search = (userArr) => {
    setSearchForm(userArr);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8083/member/search")
      .then((res) => {
        setData(res.data);
        setSearchForm(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/data/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="membership">
      <h1>Search Member</h1>

      <div className="search">
        <SearchForm search={search} data={data} />
      </div>

      <table className="table table-striped table-nonfluid">
        <thead className="thead-dark">
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Member ID</th>
            <th scope="col">Address</th>
            <th scope="col">Delete</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {searchForm.length === 0 ? (
            <tr>
              <td className="error">Sorry, no results found!</td>
            </tr>
          ) : (
            searchForm.map((user) => (
              <tr key={user.id}>
                <td>{user.fn}</td>
                <td>{user.fn}</td>
                <td>{user.memberID}</td>
                <td>
                  {user.address_1} {user.city} {user.state}
                </td>
                <td>
                  <Button
                    onClick={() => {
                      handleDelete(user.id);
                      refreshPage();
                    }}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Button variant="secondary">Edit</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Membership;
