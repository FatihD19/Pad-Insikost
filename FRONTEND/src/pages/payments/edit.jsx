import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useForm from "hooks/useForm";
import { uploadPhoto } from "services/common";
import { getPayment, editPayment } from "services/payments";
import { getUsers } from "services/users";
import { getRooms } from "services/rooms";
import Autocomplete from "@material-ui/lab/Autocomplete";
import EditIcon from "@material-ui/icons/Edit";
import AddImagesIcon from "assets/add-images";
import FileIcon from "assets/file.svg";
import Badge from "@material-ui/core/Badge";
import axios from "axios";
import { months } from "constants/_variables";
import { formatRupiah } from "utils";

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

const title = "Edit Pembayaran";

export default function Page() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);

  const { form, handleChange, setForm } = useForm({
    user_id: "",
    room_id: "",
    nominal: "",
    uang_diterima: "",
    uang_kembalian: "",
    month: "",
    year: "",
    photo: "",
    photo_url: "",
  });

  const [ValueUser, setValueUser] = React.useState(null);
  const [ValueRoom, setValueRoom] = React.useState(null);
  const [ValueMonth, setValueMonth] = React.useState(null);

  React.useEffect(() => {
    axios.all([getUsers(), getRooms()]).then(([resUsers, resRooms]) => {
      getPayment(id).then((res) => {
        const dataUsers = resUsers
          .filter(
            (user) =>
              (user.role === "PENGHUNI" && user.room !== null) ||
              user.id === res.user?.id
          )
          .map((user) => ({
            id: user.id,
            name: user.name,
            room_id: user.room.id,
          }));

        const dataRooms = resRooms.map((room) => ({
          id: room.id,
          name: room.name,
        }));

        setUsers(dataUsers);
        setRooms(dataRooms);

        setForm({
          user_id: res.user_id,
          room_id: res.room_id,
          nominal: res.nominal,
          uang_diterima: res.uang_diterima,
          uang_kembalian: res.uang_kembalian,
          month: res.month,
          year: res.year,
          photo: res.photo_url,
          photo_url: res.photo_url,
        });

        setValueUser({
          id: res.user?.id,
          name: res.user?.name,
          room_id: res?.room?.id,
        });
        setValueRoom({ id: res.room?.id, name: res.room?.name });
        setValueMonth(months[res.month - 1]);
      });
    });
  }, []);

  React.useEffect(() => {
    setForm({
      ...form,
      uang_kembalian: Math.max(0, form.uang_diterima - form.nominal),
    });
  }, [form.nominal, form.uang_diterima]);

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
        user_id: form.user_id,
        room_id: form.room_id,
        nominal: form.nominal,
        uang_diterima: form.uang_diterima,
        uang_kembalian: form.uang_kembalian,
        month: form.month,
        year: form.year,
        photo_url: photo_url,
      };

      editPayment(id, body).then((res) => {
        console.log(res);
        alert("Berhasil mengedit Pembayaran!");
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
              <Grid item xs={12} md={6} container alignItems="center">
                <Autocomplete
                  value={ValueUser}
                  onChange={(event, newValue) => {
                    setValueUser(newValue);
                    setForm({
                      ...form,
                      user_id: newValue?.id,
                      room_id: newValue?.room_id,
                    });

                    setValueRoom(
                      rooms.filter((room) => room.id === newValue.room_id)[0]
                    );
                  }}
                  options={users}
                  getOptionLabel={(option) => option.name}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Nama Penghuni"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6} container alignItems="center">
                <Autocomplete
                  disabled
                  value={ValueRoom}
                  onChange={(event, newValue) => {
                    setValueRoom(newValue);
                    setForm({ ...form, room_id: newValue?.id });
                  }}
                  options={users}
                  getOptionLabel={(option) => option.name}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Nama Kamar"
                      variant="outlined"
                      style={{ background: "#EEE" }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <TextField
                  type="number"
                  disabled
                  style={{ background: "#EEE" }}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="nominal"
                  label="Harga Kamar"
                  name="nominal"
                  autoComplete="nominal"
                  value={form.nominal}
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
                  id="uang_diterima"
                  label="Uang diterima"
                  name="uang_diterima"
                  autoComplete="uang_diterima"
                  value={form.uang_diterima}
                  onChange={handleChange}
                  error={form.uang_diterima < form.nominal}
                  helperText={
                    form.uang_diterima < form.nominal
                      ? `Bayarnya kurang : ${formatRupiah(
                          form.nominal - form.uang_diterima
                        )}`
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="number"
                  disabled
                  style={{ background: "#EEE" }}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="uang_kembalian"
                  label="Uang Kembalian"
                  name="uang_kembalian"
                  autoComplete="uang_kembalian"
                  value={form.uang_kembalian}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6} container alignItems="center">
                <Autocomplete
                  value={ValueMonth}
                  onChange={(event, newValue) => {
                    setValueMonth(newValue);
                    setForm({ ...form, month: months.indexOf(newValue) + 1, });
                  }}
                  options={months}
                  getOptionLabel={(option) => option}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Bulan"
                      variant="outlined"
                      style={{ transform: "translateY(4px)" }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  type="number"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="year"
                  label="Tahun"
                  name="year"
                  autoComplete="year"
                  value={form.year}
                  onChange={handleChange}
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
                      <img src={form.photo_url} className={classes.img} />
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
                            <img src={FileIcon} alt="file" />
                          </Badge>
                        </Grid>
                        <Grid container justify="center">
                          <Typography
                            variant="body2"
                            className={classes.textGrey}
                          >
                            Foto Bukti Pembayaran
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
