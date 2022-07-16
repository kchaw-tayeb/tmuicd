import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";
export function TableEditButton({ row }) {
  const navigate = useNavigate();
  const handlePush = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    // <Link to="/edit">
    //   <IconButton color="primary" aria-label="upload picture" component="span">
    //     <EditIcon />
    //   </IconButton>
    // </Link>
    // *************

    <IconButton
      color="primary"
      aria-label="upload picture"
      component="span"
      onClick={() => handlePush(row._id)}
    >
      <EditIcon />
    </IconButton>
  );
}
export function TableDeleteButton({ row, setDeleteI }) {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "are you sure to delete this",
      subTitle: "you can't udo this operation",
      onConfirm: () => {
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false,
        });
        axios
          .delete(`/api/companies/${id}`)

          // .delete("/api/companies/6200b641479c02277c371b3b")
          .then(setDeleteI(true))
          .catch((error) => {
            console.error("There was an error!", error);
          });
      },
    });
  };
  return (
    <>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        // onClick={handleDelete}
        onClick={() => handleDelete(row._id)}
      >
        <DeleteForeverIcon />
      </IconButton>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
