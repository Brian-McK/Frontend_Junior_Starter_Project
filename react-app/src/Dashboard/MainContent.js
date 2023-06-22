import React from "react";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";

export default function MainContent() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Outlet />
    </Container>
  );
}