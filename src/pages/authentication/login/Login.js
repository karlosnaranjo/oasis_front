import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Card, Stack, Link, Container, Typography } from "@mui/material";
// routes
import { PATH_AUTH } from "routes/paths";
// hooks
// import useAuth from 'hooks/useAuth';
// layouts
// components
import Page from "components/Page";
import { MHidden } from "components/@material-extend";
import Logo from "components/Logo";
import LoginForm from "./LoginForm";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 350,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title="Login">
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Ingresa a tu cuenta
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Ingrese sus datos a continuación.
              </Typography>
            </Box>
            <Logo sx={{ width: 65, height: 65 }} />
          </Stack>
          <LoginForm />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              ¿Aún no tienes una cuenta?&nbsp;
              <Link
                variant="subtitle2"
                component={RouterLink}
                to={PATH_AUTH.register}
              >
                CREAR CUENTA
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
