import * as React from "react";
import Typography from "@mui/material/Typography";
import { Grid, Icon, Button } from "@mui/material";

const CustomError = ({
  message,
  icon,
  iconColor,
  iconSize,
  refetchButton,
  refetchData,
}) => {
  const handleRefetch = () => {
    refetchData();
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Icon color={iconColor}>{icon}</Icon>
      </Grid>
      <Grid item>
        <Typography variant="body1">{message}</Typography>
      </Grid>
      {refetchButton && (
        <Grid item>
          <Button onClick={handleRefetch} variant="contained">
            Refetch data
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default CustomError;
