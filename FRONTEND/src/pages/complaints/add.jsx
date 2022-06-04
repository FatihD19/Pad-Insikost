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
import { uploadPhoto } from "services/common";
import { createComplaint } from "services/complaints";
import EditIcon from "@material-ui/icons/Edit";
import AddImagesIcon from "assets/add-images";
import FileIcon from "assets/file.svg";
import Badge from "@material-ui/core/Badge";

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

const title = "Tambah Pelaporan";

const user = JSON.parse(localStorage.getItem("user"));

export default function Page() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const { form, handleChange, setForm } = useForm({
    name: "",
    content: "",
    photo: "",
    photo_url: "",
  });

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
      let formData = new FormData();
      formData.append("photo", form.photo);
      const { photo_url } = await uploadPhoto(formData);
      console.log(photo_url);

      const body = {
        user_id: user.id,
        name: form.name,
        content: form.content,
        photo_url: form.photo_url,
      };

      createComplaint(body).then((res) => {
        console.log(res);
        alert("Berhasil membuat Pelaporan!");
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
              <Grid item xs={12} md={12}>
                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="content"
                  label="Isi pesan"
                  name="content"
                  autoComplete="content"
                  value={form.content}
                  onChange={handleChange}
                  multiline
                  rows={5}
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
                            Upload Foto Pelaporan
                          </Typography>
                        </Grid>
                      </label>
                    </>
                  )}
                </div>
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
