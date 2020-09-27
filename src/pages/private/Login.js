import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Firebase from "../../Services/firebase";

//import { Helmet } from "react-helmet";
import { UserContext } from "../../Services/UserContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "whiteSmoke",
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
}));

export default function SignIn({ history }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const classes = useStyles();
  //const TITLE = "LogIn";

  const currentUser = useContext(UserContext);

  function HandleLogin(e) {
    e.preventDefault();
    try {
      Firebase.login(email, password)
        .then(history.push("/dashboard"))
        .catch((err) => {
          alert(err);
        });
    } catch (err) {
      alert(err);
    }
  }

  if (currentUser) {
    history.push("/dashboard");
    return null;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        {/*         <Helmet>
          <title>{TITLE}</title>
        </Helmet> */}
        <div className={classes.paper}>
          <CssBaseline />
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                HandleLogin(e);
              }}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}
