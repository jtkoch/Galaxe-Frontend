import React, { useState, useEffect } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import axios from "axios"
import { useHistory } from "react-router-dom"

const EditDrug = (props) => {
    const history = useHistory()
    const [form, setForm] = useState({
      drugName: "",
      nationalDrugCode: "",
      drugStrength: "",
      genericCodeNum: "",
      unitOfMeasurement: "",
      dosage: ""
    })

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
      setForm({ ...form, [event.target.name]: event.target.value })
    }
  
    const routeChange = () => {
      let path="/Drug"
      history.push(path)
    }

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
                placeholder="Enter Drug Name"
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
            <Form.Label>Generic Code Num</Form.Label>
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
    )
}

export default EditDrug

// import React, {Component} from 'react'
// import {Link} from 'react-router-dom'
// import Form from "react-bootstrap/Form"
// import Button from "react-bootstrap/Button"
// import axios from "axios"

// class EditDrug extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       id: this.props.match.params.id,
//       drugName: "",
//       nationalDrugCode: "",
//       drugStrength: "",
//       genericCodeNum: "",
//       unitOfMeasurement: "",
//       dosage: "",
//     }
//     this.handleChange = this.handleChange.bind(this)
//   }

//   handleChange = (e) => {
//     const target = e.target
//     const value = target.value
//     const name = target.name

//     this.setState({
//       [name]: value
//     })
//   }

//   componentDidMount() {
//     this.getDrugDetails()
//   }

//   getDrugDetails = () => {
//     let drugId = this.props.match.params.id
//       axios
//         .get(`http://localhost:9000/drugs/${drugId}`)
//         .then(response => {
//           this.setState({
//             id: response.id,
//             drugName: response.drugName,
//             nationalDrugCode: response.nationalDrugCode,
//             drugStrength: response.drugStrength,
//             genericCodeNum: response.genericCodeNum,
//             unitOfMeasurement: response.unitOfMeasurement,
//             dosage: response.dosage
//           }, () => {
//             console.log(this.state)
//           })
//         })
//         .catch(error => console.log(error))
//   }

//       editDrug = (newDrug) => {
//         axios.request({
//           method: 'put',
//           url: `http://localhost:9000/update/${this.state.id}`,
//           data: newDrug
//         }).then(response => {
//           this.props.history.push("/Drug")
//           console.log(response)
//         })
//         .catch(error => {
//           console.log(error)
//         })
//       }

//     handleSubmit = (e) => {
//       const newDrug = {
//         id: this.state.id.value,
//         drugName: this.state.drugName.value,
//         nationalDrugCode: this.state.nationalDrugCode.value,
//         drugStrength: this.state.drugStrength.value,
//         genericCodeNum: this.state.genericCodeNum.value,
//         unitOfMeasurement: this.state.unitOfMeasurement.value,
//         dosage: this.state.dosage.value,
//       }
//       this.editDrug(newDrug)
//       console.log(this.data)
//       e.preventDefault()
//     }

//   render() {
//     return (
//         <div className="register-container">
//         <Form className="p-5" onSubmit={this.handleSubmit.bind(this)}>
//             <Form.Group controlId="drugName">
//             <Form.Label>Drug Name</Form.Label>
//             <Form.Control
//                 type="text"
//                 name="drugName"
//                 placeholder="Enter Drug Name"
//                 value={this.state.drugName}
//                 onChange={this.handleChange}
//             />
//             </Form.Group>
//             <Form.Group controlId="nationalDrugCode">
//             <Form.Label>National Drug Code</Form.Label>
//             <Form.Control
//                 type="text"
//                 name="nationalDrugCode"
//                 placeholder="Enter National Drug Code"
//                 value={this.state.nationalDrugCode}
//                 onChange={this.handleChange}
//             />
//             </Form.Group>
//             <Form.Group controlId="drugStrength">
//             <Form.Label>Drug Strength</Form.Label>
//             <Form.Control
//                 type="text"
//                 name="drugStrength"
//                 placeholder="Enter Drug Strength"
//                 value={this.state.drugStrength}
//                 onChange={this.handleChange}
//             />
//             </Form.Group>
//             <Form.Group controlId="genericCodeNum">
//             <Form.Label>Generic Code Num</Form.Label>
//             <Form.Control
//                 type="number"
//                 name="genericCodeNum"
//                 placeholder="Enter Generic CodeNum"
//                 value={this.state.genericCodeNum}
//                 onChange={this.handleChange}
//             />
//             </Form.Group>
//             <Form.Group controlId="unitOfMeasurement">
//             <Form.Label>Unit Of Measurement</Form.Label>
//             <Form.Control
//                 type="text"
//                 name="unitOfMeasurement"
//                 placeholder="Enter Unit Of Measurement"
//                 value={this.state.unitOfMeasurement}
//                 onChange={this.handleChange}
//             />
//             </Form.Group>
//             <Form.Group controlId="dosage">
//             <Form.Label>Dosage</Form.Label>
//             <Form.Control
//                 type="text"
//                 name="dosage"
//                 placeholder="Enter Dosage"
//                 value={this.state.dosage}
//                 onChange={this.handleChange}
//             />
//             </Form.Group>
//             <Button variant="primary" className="ml-5 mr-5" type="submit">Submit</Button>
//             <Link to="/Drug"><Button variant="secondary" className="ml-5 mr-5">Cancel</Button></Link>
//         </Form>
//         </div>
//     )
//   }

// }

// export default EditDrug
