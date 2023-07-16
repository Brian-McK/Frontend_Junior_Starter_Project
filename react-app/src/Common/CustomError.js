import * as React from "react";
import Typography from "@mui/material/Typography";
import { Grid, Icon } from "@mui/material";

const CustomError = ({ message, icon, iconColor, iconSize }) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Icon color={iconColor}>
          {icon}
        </Icon>
      </Grid>
      <Grid item>
        <Typography variant="body1">{message}</Typography>
      </Grid>
    </Grid>
  );
};

export default CustomError;
