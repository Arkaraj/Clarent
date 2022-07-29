import React, { useContext, useState } from "react";

import {
  Grid,
  Paper,
  Button,
  Link,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { AuthContext } from "../Context/AuthContext";
import AuthService from "../Services/AuthService";
import Message from "./Message";

const Login = () => {
  const [cred, setCred] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState("success");

  const { setUser, setIsAuthenticated, setAccessToken } = useContext(
    AuthContext
  );

  const onChangeCred = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.login(cred).then((data) => {
      if (data.success) {
        setMessage("Logged In");
        setStatus("success");
        const { user, accessToken } = data.data;
        localStorage.setItem("user", JSON.stringify(user));
        setAccessToken(accessToken);
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setMessage(data.message);
        setStatus("error");
      }
    });
  };

  const GridStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "2rem",
  };
  const paperStyle = {
    padding: "20px",
    height: "50vh",
    width: 280,
    margin: "80px auto",
  };
  const userName = { marginBottom: "10px" };

  return (
    <Grid style={GridStyle}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="left">
          <h4> Login </h4>
        </Grid>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            name="email"
            onChange={onChangeCred}
            autoComplete="email"
            type="email"
            required
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            required
            onChange={onChangeCred}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          {message ? (
            <>
              <Message msg={message} status={status} />
            </>
          ) : null}
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
