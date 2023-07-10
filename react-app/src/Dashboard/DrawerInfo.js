import { Stack } from "@mui/system";
import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Brian McKenna "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function DrawerInfo({ isDrawerOpen }) {
  return (
    <>
      <Stack
        spacing={2}
        sx={{
          alignItems: "center",
          padding: "24px",
          marginTop: "auto"
        }}
      >
        {isDrawerOpen === true ? (
          <>
            <Avatar
              src=""
              sx={{ width: 130, height: 130, mb: 2 }}
            />
            <Copyright />
          </>
        ) : (
          <Avatar
            src=""
            sx={{ width: 40, height: 40, mb: 2 }}
          />
        )}
      </Stack>
    </>
  );
}