import "./App.css";
import Button from "@material-ui/core/Button";
import Tcompany from "../src/components/Tcompany";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "../src/components/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>CRUD</h1>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/add" element={<AddForm />} />
          <Route exact path="/edit/:id" element={<EditForm />} />
        </Routes>
        {/* <AddForm /> */}
      </div>
    </Router>
  );
}

export default App;
