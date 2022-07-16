import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Popup from "./Popup";
import { useState, useEffect } from "react";
import AddFormEmployer from "./AddFormEmployer";
import EditFormEmployer from "./EditFormEmployer";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import axios from "axios";
import { TableEditButton, TableDeleteButton } from "./Taction";
import TableEditButtonEmployer from "./TableEditButtonEmployer";
import TableDeleteButtonEmployer from "./TableDeleteButtonEmployer";
import GetCompanyFromId from "./GetCompanyFromId";

function Temployers() {
  const [openPopup, setOpenPopup] = useState(false);
  const hidePopup = () => {
    setOpenPopup(false);
  };
  // ********************

  const [employers, setEmployers] = useState([]);
  const [deleteIE, setDeleteIE] = useState(false);
  const [editEmployer, setEditEmployer] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get("/api/employers");
        setEmployers(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [openPopup, editEmployer, deleteIE]);
  // }, [deleteIE]);
  return (
    <>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={() => setOpenPopup(true)}
      >
        <AddCircleIcon />
      </IconButton>
      <React.Fragment>
        <Title>Employers</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Second Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employers.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.secondName}</TableCell>
                <TableCell>{row.phone}</TableCell>
                {/* <TableCell>{row.company}</TableCell> */}
                <TableCell>
                  <GetCompanyFromId id={row.company} />
                </TableCell>
                <TableCell align="right">
                  {/* <TableEditButton row={row} /> */}
                  {/* <TableDeleteButton row={row} setDeleteI={} /> */}
                  {/* <TableDeleteButton row={row} setDeleteI={setDeleteI} /> */}
                  <TableDeleteButtonEmployer
                    row={row}
                    setDeleteIE={setDeleteIE}
                  />
                  <TableEditButtonEmployer
                    row={row}
                    setEditEmployer={setEditEmployer}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <AddFormEmployer hidePopup={hidePopup} />
      </Popup>
    </>
  );
}

export default Temployers;
