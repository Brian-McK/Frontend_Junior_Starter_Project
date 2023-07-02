import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditEmployee from "../Employees/EditEmployee";

export default function EditFormDialog({
  open,
  setOpen,
  employeeData,
  skillLevelsToSelect,
}) {
  const employeeBeforeEdit = employeeData;


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Edit Employee Details For: {`${employeeBeforeEdit.firstName}`}{" "}
          {`${employeeBeforeEdit.lastName}`}
        </DialogTitle>
        <DialogContent>
          <EditEmployee
            employeeDetails={employeeBeforeEdit}
            skillLevelsToSelect={skillLevelsToSelect}
            setOpen={setOpen}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
