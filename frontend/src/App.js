import "./App.scss";
import { Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
// import SwaggerEditor, { plugins } from "swagger-editor";
// import "swagger-editor/dist/swagger-editor.css";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Drug from "./Pages/Drug";
import Membership from "./Pages/Membership";
import Pharmacy from "./Pages/Pharmacy";
import AddDrug from "./Pages/AddDrug";

const App = () => {
  return (
    <div className="App">
      <Navigation />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Register" component={Register} />
      <Route path="/Home" component={Home} />
      <Route path="/Membership" component={Membership} />
      <Route path="/Drug" component={Drug} />
      <Route path="/Pharmacy" component={Pharmacy} />
      <Route path="/AddDrug" component={AddDrug} />
    </div>
  );
};

export default App;
