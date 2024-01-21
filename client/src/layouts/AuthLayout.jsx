import { Grid, Container } from "@mui/material";

const AuthLayout = ({ children }) => {
  return (
    <Container>
      <Grid
        container
        spacing={3}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid item xs={4} md={4}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthLayout;
