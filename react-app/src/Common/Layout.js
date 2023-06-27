import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

export default function Layout() {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Outlet />
    </Container>
  );
}
