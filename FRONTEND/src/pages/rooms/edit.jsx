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
import { uploadPhoto } from "services/common";
import { getRoom, editRoom } from "services/rooms";
import { getUsers } from "services/users";
import { getFacilities } from "services/facilities";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import EditIcon from "@material-ui/icons/Edit";
import AddImagesIcon from "assets/add-images";
import FileIcon from "assets/file.svg";
import Badge from "@material-ui/core/Badge";
import axios from "axios";

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
  upload: {
    width: "100%",
    border: "2px dashed #DDD",
    borderRadius: 8,
    minHeight: 250,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: theme.spacing(2),
  },
  textGrey: {
    color: "#AAA",
  },
  uploadButton: {
    background: "rgba(0,0,0,0.2)",
    color: "#FFF",
    "&:hover": {
      background: "rgba(0,0,0,0.2)",
      color: "#FFF",
    },
  },
  img: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 8,
    objectFit: "cover",
  },
  mb: {
    marginBottom: theme.spacing(2),
  },
  textGrey: {
    color: "#AAA",
  },
}));

const title = "Edit Kamar";

export default function Page() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);

  const [users, setUsers] = React.useState([]);
  const [facilities, setFacilities] = React.useState([]);
  const { form, handleChange, setForm } = useForm({
    name: "",
    size: "",
    price: 0,
    status: "KOSONG",
    user_id: "",
    facilities_id: [],
    photo: "",
    photo_url: "",
  });

  const [ValueUser, setValueUser] = React.useState(null);
  const [ValueFacilities, setValueFacilities] = React.useState([]);

  React.useEffect(() => {
    axios
      .all([getUsers(), getFacilities()])
      .then(([resUsers, resFacilities]) => {
        // get detail room
        getRoom(id).then((res) => {
          const dataUsers = resUsers
            .filter(
              (user) =>
                (user.role === "PENGHUNI" && user.room === null) ||
                user.id === res.user?.id
            )
            .map((user) => ({ id: user.id, name: user.name }));
          const dataFacilities = resFacilities.map((facility) => ({
            id: facility.id,
            name: facility.name,
          }));

          setUsers(dataUsers);
          setFacilities(dataFacilities);

          setForm({
            name: res.name,
            size: res.size,
            price: res.price,
            status: res.status,
            user_id: res.user?.id,
            facilities_id: res.facilities.map((facility) => facility.id),
            photo: res.photo_url,
            photo_url: res.photo_url,
          });

          setValueUser({ id: res.user?.id, name: res.user?.name });
          setValueFacilities(
            res.facilities.map((facility) => ({
              id: facility.id,
              name: facility.name,
            }))
          );
        });
      });
  }, []);

  const handleChangePhoto = (event) => {
    setForm({
      ...form,
      photo: event.target.files[0],
      photo_url: URL.createObjectURL(event.target.files[0]),
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

      const body = {
        name: form.name,
        size: form.size,
        price: Number(form.price),
        status: form.status,
        facilities_id: form.facilities_id,
        photo: form.photo,
        photo_url: photo_url,
        user_id: null,
      };

      if (form.status === "TERISI") {
        body.user_id = form.user_id;
      }
      editRoom(id, body).then((res) => {
        console.log(res);
        alert("Berhasil mengedit Kamar!");
        handleBack();
      });
    } catch (err) {
      alert(err);
      console.log(err);
      return false;
    } finally {
      setLoading(false);
    }
  }

  function addDefaultSrc(e) {
    setForm({
      ...form,
      photo: "",
      photo_url: "",
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

          <Typography color="primary" variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Grid>

        <Paper className={classes.paper}>
          <form onSubmit={handleSubmit}>
            <Grid container style={{ flexGrow: 1 }} spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Nama Kamar"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="size"
                  label="Ukuran Kamar"
                  name="size"
                  autoComplete="size"
                  value={form.size}
                  onChange={handleChange}
                  placeholder="10 x 10 Meter"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  type="number"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="price"
                  label="Harga per-bulan"
                  name="price"
                  autoComplete="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder=""
                />
              </Grid>

              <Grid item xs={12} md={6} container alignItems="center">
                <FormControl
                  required
                  variant="outlined"
                  fullWidth
                  style={{ transform: `translateY(4px)` }}
                >
                  <InputLabel id="status-label">Kondisi Kamar</InputLabel>
                  <Select
                    labelId="status-label"
                    id="status"
                    value={form.status}
                    name="status"
                    onChange={handleChange}
                    label="Kondisi Kamar"
                  >
                    <MenuItem value="KOSONG">KOSONG</MenuItem>
                    <MenuItem value="TERISI">TERISI</MenuItem>
                    <MenuItem value="NONAKTIF">NONAKTIF</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {form.status === "TERISI" && (
                <Grid item xs={12} md={6} container alignItems="center">
                  <Autocomplete
                    value={ValueUser}
                    onChange={(event, newValue) => {
                      setValueUser(newValue);
                      setForm({ ...form, user_id: newValue?.id });
                    }}
                    options={users}
                    getOptionLabel={(option) => option.name}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Penghuni"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              )}

              <Grid
                item
                xs={12}
                md={form.status !== "TERISI" ? 12 : 6}
                container
                alignItems="center"
              >
                <Autocomplete
                  value={ValueFacilities}
                  onChange={(event, newValue) => {
                    setValueFacilities(newValue);
                    setForm({
                      ...form,
                      facilities_id: newValue.map((facility) => facility.id),
                    });
                  }}
                  multiple
                  fullWidth
                  options={facilities}
                  getOptionLabel={(option) => option.name}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Fasilitas"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <div
                  className={classes.upload}
                  style={{
                    border: form.photo_url === "" ? "2px dashed #DDD" : "none",
                  }}
                >
                  <input
                    accept="image/*"
                    className={classes.hide}
                    name="photo"
                    onChange={handleChangePhoto}
                    id="outlined-button-file"
                    type="file"
                  />
                  {form.photo_url !== "" ? (
                    <>
                      <img
                        src={form.photo_url}
                        className={classes.img}
                        onError={addDefaultSrc}
                      />
                      <label htmlFor="outlined-button-file">
                        <Button
                          color="default"
                          className={classes.uploadButton}
                          component="span"
                          startIcon={<EditIcon />}
                        >
                          Ganti Foto
                        </Button>
                      </label>
                    </>
                  ) : (
                    <>
                      <label htmlFor="outlined-button-file">
                        <Grid container justify="center" className={classes.mb}>
                          <Badge
                            overlap="circle"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={<AddImagesIcon />}
                          >
                            <img
                              src={FileIcon}
                              alt="file"
                              onError={addDefaultSrc}
                            />
                          </Badge>
                        </Grid>
                        <Grid container justify="center">
                          <Typography
                            variant="body2"
                            className={classes.textGrey}
                          >
                            Upload Foto Kamar
                          </Typography>
                        </Grid>
                      </label>
                    </>
                  )}
                </div>
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
