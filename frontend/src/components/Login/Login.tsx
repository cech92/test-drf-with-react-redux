import React, { FC } from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signIn } from '../../actions/userActions';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
const theme = createTheme();

interface IProps {
  login: (data: any) => any;
}

const Login: FC<IProps> = ({login}) => {
  var error = useSelector((state: any) => state.user.error);
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      if (data.get("email") && data.get("password")) {
          login(data);
      }
  };

  const setError = (value: any) => {
    error = value;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={(e: any) => handleSubmit(e)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >Sign In</Button>
            {error === true ? <Alert onClose={() => setError(false)} severity="error">
                <AlertTitle>Error</AlertTitle>
                Wrong credentials — <strong>Please check the credentials</strong>
            </Alert> : null}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    login: (data: any) => dispatch(signIn(data)),
  }
}

const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(Login);
export { connectedLoginPage as Login };