import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useForm from "hooks/useForm";
import { createFacility } from "services/facilities";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 700,
  },
  title: {
    fontWeight: "bold",
  },
  paper: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const title = "Tambah Fasilitas";

export default function Page() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);

  const { form, handleChange, setForm } = useForm({
    name: "",
  });

  function handleBack() {
    history.goBack();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    createFacility({
      name: form.name,
    })
      .then((res) => {
        console.log(res);
        setTimeout(function () {
          alert("Berhasil menambahkan Fasilitas!");
        }, 1);

        handleBack();
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <React.Fragment>
      <div className={classes.container}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          style={{ marginBottom: 15 }}
        >
          <Button
            style={{ color: "grey" }}
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Kembali
          </Button>

          <Typography variant="h6" color="primary" className={classes.title}>
            {title}
          </Typography>
        </Grid>

        <Paper className={classes.paper}>
          <form onSubmit={handleSubmit}>
            <Grid container style={{ flexGrow: 1 }} spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Nama Fasilitas"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} container justify="flex-end">
                <Button type="submit" variant="contained" color="primary">
                  {loading ? "Tunggu sebentar..." : "Tambah"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </React.Fragment>
  );
}
