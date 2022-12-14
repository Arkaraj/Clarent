import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import AuthService from "../Services/AuthService";
import Message from "./Message";

const useStyles = () => {
  const theme = useTheme();
  return {
    root: {
      height: "100vh",
    },
    image: {
      backgroundImage: "url(https://source.unsplash.com/random)",
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "dark"
          ? theme.palette.grey[900]
          : theme.palette.grey[50],
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderBottomLeftRadius: "1rem",
      borderTopLeftRadius: "1rem",
    },
    loginDiv: {
      width: "40%",
      padding: "2%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "1rem",
      marginRight: "auto",
      marginLeft: "auto",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  };
};

const Register = () => {
  const classes = useStyles();

  const [user, setUser] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState("success");

  let timerID = useRef(null);
  let navigate = useNavigate();

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChangeCred = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    AuthService.register(user).then((data) => {
      setMessage(data.message);
      setStatus("success");
      if (data.success) {
        setUser({
          firstname: "",
          lastname: "",
          password: "",
          email: "",
        });

        // execute after 2 secs
        timerID = setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setMessage(data.message);
        setStatus("error");
      }
    });
  };

  return (
    <Grid
      item
      xs={12}
      sm={8}
      md={5}
      component={Paper}
      elevation={6}
      square
      sx={classes.loginDiv}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20%",
          marginBottom: "20%",
        }}
      >
        <Avatar sx={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form sx={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="First Name"
            name="firstname"
            type="text"
            required
            onChange={onChangeCred}
            autoComplete="first name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Last Name"
            name="lastname"
            type="text"
            required
            onChange={onChangeCred}
            autoComplete="last name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            required
            onChange={onChangeCred}
            autoComplete="email"
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
        {message ? (
          <>
            <Message msg={message} status={status} />
          </>
        ) : null}
      </div>
    </Grid>
  );
};

export default Register;
