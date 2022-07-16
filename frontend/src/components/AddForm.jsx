import React from "react";
import Title from "./Title";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@material-ui/icons/Save";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "50%",
      margin: theme.spacing(1),
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));
function AddForm() {
  // name: "company1",
  //   adresse: "adresse1",
  //   phone: 11111111,
  //   tva: "tva1",
  const [name, setName] = useState("");
  const [adresse, setAdresse] = useState("");
  const [phone, setPhone] = useState(0);
  const [tva, setTva] = useState("");
  const [data, setData] = useState(null);
  const classes = useStyles();
  const navigate = useNavigate();
  const handleSubmit = () => {
    const data = {
      name: name,
      adresse: adresse,
      phone: phone,
      tva: tva,
    };
    axios
      .post("/api/companies", data)
      .then((res) => {
        setData(res.data);
        setName("");
        setAdresse("");
        setPhone(0);
        setTva("");
        navigate("/");
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <Title>Add a new company</Title>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Adresse"
          variant="outlined"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Phone"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Tva"
          variant="outlined"
          value={tva}
          onChange={(e) => setTva(e.target.value)}
        />
      </form>
      <Link to="/">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <ArrowBackIcon />
        </IconButton>
      </Link>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        type="submit"
        onClick={handleSubmit}
      >
        <SaveIcon />
      </IconButton>
    </div>
  );
}

export default AddForm;
