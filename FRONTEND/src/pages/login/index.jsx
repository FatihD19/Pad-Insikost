import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import useForm from "hooks/useForm";
import Logo from "assets/logo.png";
import Landing from "assets/landing.svg";
import { login } from "services/users";
import Hidden from "@material-ui/core/Hidden";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright 2020 © "}
      <b>INSIKOST</b> - Sistem Informasi Kost
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  background: {
    background: "#FFF",
    minWidth: "100vw",
    minHeight: "100vh",
  },
  content: {
    padding: 20,
    boxSizing: "border-box",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  logo: {
    margin: theme.spacing(1),
    width: 100,
  },
  title: {
    fontWeight: "bold",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { form, handleChange } = useForm({
    phone: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    login(form)
      .then((res) => {
        console.log(res);
        localStorage.setItem("isLogin", true);
        localStorage.setItem("token", res.access_token);
        localStorage.setItem("user", JSON.stringify(res.user));
        history.push("/");
      })
      .catch(() => {
        alert("Email atau password anda salah!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isLogin = localStorage.getItem("isLogin") === "true";
  if (isLogin) {
    history.push("/home");
  }

  return (
    <div className={classes.background}>
      <div className={classes.content}>
        <CssBaseline />
        <Grid container>
          <Hidden xsDown>
            <Grid xs={12} sm={6} container justify="center" alignItems="center">
              <img src={Landing} style={{ width: "100%" }} />
            </Grid>
          </Hidden>
          <Grid xs={12} sm={6} container justify="center" alignItems="center">
            <Container component="main" maxWidth="xs">
              <div className={classes.paper}>
                <img src={Logo} alt="logo" className={classes.logo} />
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.title}
                >
                  Sistem Informasi Kost
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <TextField
                    type="number"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="Nomor HP"
                    name="phone"
                    autoComplete="phone"
                    autoFocus
                    value={form.phone}
                    onChange={handleChange}
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
                    value={form.password}
                    onChange={handleChange}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    checked={true}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    {loading ? "Tunggu sebentar..." : "Masuk"}
                  </Button>
                </form>
              </div>
              <Box mt={8}>
                <Copyright />
              </Box>
            </Container>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
