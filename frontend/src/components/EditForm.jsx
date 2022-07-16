import React from "react";
import Title from "./Title";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@material-ui/icons/Save";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
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
function EditForm() {
  // const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const classes = useStyles();
  const params = useParams();
  const id = params.id;
  const [name, setName] = useState("");
  const [adresse, setAdresse] = useState("");
  const [phone, setPhone] = useState(0);
  const [tva, setTva] = useState("");
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `/api/companies/companie/${id}`
        );
        // setCompanies(response);
        console.log(data);
        setName(response.name);
        setAdresse(response.adresse);
        setPhone(response.phone);
        setTva(response.tva);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    const data = {
      name: name,
      adresse: adresse,
      phone: phone,
      tva: tva,
    };
    axios
      .put(`/api/companies/${id}`, data)
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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data: response } = await axios.get("/api/companies");
  //       setCompanies(response);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="App">
      <Title>Edit a company</Title>
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

export default EditForm;
