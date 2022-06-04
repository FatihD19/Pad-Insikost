import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getUser } from "services/users";
import PlaceholderPhoto from "assets/placeholder-photo.png";
import { formatRupiah } from "utils";
import Chip from "@material-ui/core/Chip";
import LinearProgress from "@material-ui/core/LinearProgress";

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
  roomImg: {
    width: "100%",
    borderRadius: 8,
    marginBottom: theme.spacing(2),
  },
  roomTitle: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    display: "block",
  },
  roomContent: {
    color: "#414141",
    marginBottom: theme.spacing(2),
  },
}));

const title = "Profile";

export default function Page() {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const id = user.id;
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    getUser(id).then((res) => {
      console.log(res);
      setUser(res);
      setLoading(false);
    });
  }, []);

  function handleBack() {
    history.goBack();
  }

  function addDefaultSrc(e) {
    e.target.src = PlaceholderPhoto;
  }

  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            style={{ marginBottom: 15 }}
          >
            <Typography variant="h6" color="primary" className={classes.title}>
              {title}
            </Typography>

            <Button
              style={{ color: "grey" }}
              startIcon={<EditIcon />}
              onClick={() => history.push(`/profile/edit/${user.id}`)}
            >
              Edit
            </Button>
          </Grid>

          {loading && <LinearProgress />}

          <Paper className={classes.paper}>
            <Grid container style={{ flexGrow: 1 }} spacing={2}>
              <Grid container justify="center">
                <Avatar
                  src={user.photo_url}
                  className={classes.avatar}
                  style={{ cursor: "pointer" }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Nama Lengkap"
                  name="name"
                  autoComplete="name"
                  value={user.name}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  type="number"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Nomor HP"
                  name="phone"
                  autoComplete="phone"
                  value={user.phone}
                />
              </Grid>

              <Grid item xs={12} md={12} container alignItems="center">
                <FormControl
                  disabled
                  required
                  variant="outlined"
                  fullWidth
                  style={{ transuser: `translateY(4px)` }}
                >
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    value={user.role}
                    name="role"
                    label="Role"
                  >
                    <MenuItem value="PEMILIK">Pemilik</MenuItem>
                    <MenuItem value="PENGHUNI">Penghuni</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {user.room && (
          <Grid item xs={12} md={4}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              style={{ marginBottom: 15 }}
            >
              <Typography
                variant="h6"
                color="primary"
                className={classes.title}
              >
                Kamar kamu
              </Typography>
            </Grid>

            <Paper className={classes.paper}>
              <img
                src={user.room.photo_url}
                className={classes.roomImg}
                onError={addDefaultSrc}
              />
              <Typography
                variant="caption"
                color="primary"
                className={classes.roomTitle}
              >
                Nama Kamar
              </Typography>
              <Typography variant="subtitle1" className={classes.roomContent}>
                {user.room.name}
              </Typography>

              <Typography
                variant="caption"
                color="primary"
                className={classes.roomTitle}
              >
                Ukuran
              </Typography>
              <Typography variant="subtitle1" className={classes.roomContent}>
                {user.room.size}
              </Typography>

              <Typography
                variant="caption"
                color="primary"
                className={classes.roomTitle}
              >
                Biaya Kos / Bulan
              </Typography>
              <Typography variant="subtitle1" className={classes.roomContent}>
                {formatRupiah(user.room.price)}
              </Typography>

              <Typography
                variant="caption"
                color="primary"
                className={classes.roomTitle}
                style={{ marginBottom: 2 }}
              >
                Fasilitas :
              </Typography>

              {user.room.facilities.map((facility) => (
                <Chip
                  size="small"
                  label={facility.name}
                  style={{ marginRight: 2 }}
                />
              )) || "-"}
            </Paper>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
