import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import "./Logout.css";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import { width } from "@mui/system";

export const AlertDialog = () => {
  const [open, setOpen] = React.useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch {
      console.log("sorry cant log you out");
    }
  };

  return (
    <div>
      <div
        style={{
          boxSizing: "border-box",
          width: "fit-content",
        }}
      >
        <Button variant="outlined" onClick={handleClickOpen}>
          Logout
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className="textFont">
            Are you sure you want to<span className="textDeco">logout</span> ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogout} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
