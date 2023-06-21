import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";

export default function MainContent() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Outlet />
    </Container>
  );
}