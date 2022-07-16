import React from "react";
// import Companies from "../data/Companies";
import { Link } from "react-router-dom";
// import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import { TableEditButton, TableDeleteButton } from "./Taction";
function Tcompany() {
  const [companies, setCompanies] = useState([]);
  const [deleteI, setDeleteI] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get("/api/companies");
        setCompanies(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [deleteI]);
  return (
    <React.Fragment>
      <Title>Companies</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Companies</TableCell>
            <TableCell>Adresse</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Tva</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.adresse}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.tva}</TableCell>
              <TableCell align="right">
                <TableEditButton row={row} />
                <TableDeleteButton row={row} setDeleteI={setDeleteI} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link to="/add">
        <Button variant="contained" color="primary">
          Add
        </Button>
      </Link>
    </React.Fragment>
  );
}

export default Tcompany;
