import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import useForm from "hooks/useForm";
import Slide from "@material-ui/core/Slide";
import { changePassword } from "services/users";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function Component({ ChangePasswordDialog, setChangePasswordDialog }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const { form, setForm, handleChange } = useForm({
    password: "",
    showPassword: false,
  });

  const handleClickshowOldPassword = () => {
    setForm({ ...form, showOldPassword: !form.showOldPassword });
  };

  const handleClickshowPassword = () => {
    setForm({ ...form, showPassword: !form.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = async () => {
    setLoading(true);
    try {
      const res = await changePassword({
        password: form.password,
      });
      console.log(res);
      setChangePasswordDialog(false);
      setForm({
        password: "",
        showPassword: false,
      });
      alert("Password berhasil diganti !");
    } catch (err) {
      console.log(err);
      alert("Gagal mengganti password, coba lagi !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      open={ChangePasswordDialog}
      // onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{ width: "400px" }}>
        <div className={classes.dialogDiv}>
          <Typography className={classes.textDialog}>Ganti Password</Typography>
          <IconButton
            onClick={() => setChangePasswordDialog(false)}
            style={{
              color: "#FFF",
              display: "inline-block",
            }}
          >
            <Close />
          </IconButton>
        </div>
        <div
          style={{
            padding: 20,
            // width: 99
          }}
        >
          <TextField
            variant="outlined"
            required
            fullWidth
            type={form.showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            label="Password baru"
            placeholder="Password baru"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickshowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {form.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 20,
            paddingTop: 0,
          }}
        >
          <Button
            style={{
              color: "grey",
              fontWeight: "bold",
              textTransform: "none",
            }}
            onClick={() => setChangePasswordDialog(false)}
          >
            Batal
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangePassword}
          >
            {loading ? "Loading..." : "Simpan"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default Component;
