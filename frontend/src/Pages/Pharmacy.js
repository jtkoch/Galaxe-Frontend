import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import SearchPharmacy from "../Components/SearchPharmacy";
import "../Styles/Pharmacy.scss";

function Pharmarcy() {
    const [pharmacies, setPharmacies] = useState([]);
    const [searchPharmarcy, setSearchPharmarcy] = useState([]);
    const history = useHistory();

    function refreshPage() {
        window.location.reload(false);
    }

    const search = (userArr) => {
        setSearchPharmarcy(userArr);
    };

    useEffect(() => {
        axios
            .get("http://localhost:8080/pharmacies")
            .then((res) => {
                setPharmacies(res.data);
                setSearchPharmarcy(res.data);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }, []);

    const handleEdit = (id) => {
        let path = `/EditPharmacy/${id}`;
        history.push(path);
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:8080/deletePharmacy/${id}`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="pharmacies">
            <h1>Pharmacies</h1>

            <div className="search">
                <SearchPharmacy search={search} data={pharmacies} />
            </div>

            <table className="table table-striped table-nonfluid">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Pharmacy Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">City</th>
                        <th scope="col">State</th>
                        <th scope="col">Country</th>
                        <th scope="col">Zip Code</th>
                        <th scope="col">NPI</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {searchPharmarcy.length === 0 ? (
                        <tr>
                            <td className="error">Sorry, no results found!</td>
                        </tr>
                    ) : (
                            searchPharmarcy.map((pharmacy) => (
                                <tr key={pharmacy.id}>
                                    <td>{pharmacy.name}</td>
                                    <td>{pharmacy.address}</td>
                                    <td>{pharmacy.city}</td>
                                    <td>{pharmacy.state}</td>
                                    <td>{pharmacy.country}</td>
                                    <td>{pharmacy.zipCode}</td>
                                    <td>{pharmacy.npi}</td>
                                    <td>
                                        <Button
                                            onClick={() => {
                                                handleDelete(pharmacy.id);
                                                refreshPage();
                                            }}
                                        >
                                            Delete
                  </Button>
                                    </td>
                                    <td>
                                        <Button
                                            onClick={() => {
                                                handleEdit(pharmacy.id);
                                            }}
                                            variant="secondary"
                                        >
                                            Edit
                  </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                </tbody>
            </table>
        </div>
    );
}

export default Pharmarcy;
