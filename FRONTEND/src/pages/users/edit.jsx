import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useForm from "hooks/useForm";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import AddPhotoIcon from "assets/add-photo";
import Badge from "@material-ui/core/Badge";
import { uploadPhoto } from "services/common";
import { getUser, editUser } from "services/users";
import { isPemilik, getProfile } from "utils";
import Tooltip from "@material-ui/core/Tooltip";

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
  hide: {
    display: "none",
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: theme.spacing(2),
    textAlign: "center",
    margin: "0 auto",
  },
}));

const title = "Edit Pengguna";

export default function Page() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const user = getProfile();
  const { form, handleChange, setForm } = useForm({
    photo: "",
    photo_url: "",
    name: "",
    phone: "",
    role: "",
  });

  React.useEffect(() => {
    getUser(id).then((res) => {
      console.log(res);
      setForm({
        ...form,
        id: res.id,
        photo_url: res.photo_url,
        photo: res.photo_url,
        name: res.name,
        phone: res.phone,
        role: res.role,
      });
    });
  }, []);

  const handleChangeSwitch = (event) => {
    setForm({ ...form, [event.target.name]: event.target.checked });
  };

  const handleChangeFoto = (event) => {
    setForm({
      ...form,
      photo_url: URL.createObjectURL(event.target.files[0]),
      photo: event.target.files[0],
    });
  };

  function handleBack() {
    history.goBack();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // UPLOAD PHOTO
      let photo_url;

      if (form.photo !== form.photo_url) {
        let formData = new FormData();
        formData.append("photo", form.photo);
        const res = await uploadPhoto(formData);
        photo_url = res.photo_url;
      } else {
        photo_url = form.photo_url;
      }

      editUser(id, {
        photo_url: photo_url,
        name: form.name,
        phone: form.phone,
        role: form.role,
      }).then((res) => {
        console.log(res);
        if (user.id === form.id) {
          getUser(res.id).then((res) => {
            console.log(res);
            localStorage.setItem("user", JSON.stringify(res));
            alert("Berhasil mengedit pengguna!");
            handleBack();
            return false;
          });
        } else {
          alert("Berhasil mengedit pengguna!");
          handleBack();
          return false;
        }
      });
    } catch (err) {
      alert(err);
      console.log(err);
      return false;
    } finally {
      setLoading(false);
    }
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
              <Grid container justify="center">
                <input
                  accept="image/*"
                  className={classes.hide}
                  onChange={handleChangeFoto}
                  id="outlined-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="outlined-button-file">
                  <Badge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    badgeContent={
                      <div style={{ transform: "translateY(-12px)" }}>
                        <AddPhotoIcon />
                      </div>
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <Avatar
                      src={form.photo_url}
                      className={classes.avatar}
                      style={{ cursor: "pointer" }}
                    />
                  </Badge>
                </label>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Nama Lengkap"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
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
                  value={form.phone}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={12} container alignItems="center">
                <FormControl
                  required
                  variant="outlined"
                  fullWidth
                  style={{ transform: `translateY(4px)` }}
                  disabled
                >
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    value={form.role}
                    name="role"
                    onChange={handleChange}
                    label="Role"
                  >
                    <MenuItem value="PEMILIK">Pemilik</MenuItem>
                    <MenuItem value="PENGHUNI">Penghuni</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} container justify="flex-end">
                <Button type="submit" variant="contained" color="primary">
                  {loading ? "Tunggu sebentar..." : "Edit"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </React.Fragment>
  );
}
