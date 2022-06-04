import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { getUserPaymentStatus } from "services/payments";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    marginBottom: theme.spacing(2),
  },
}));

export default function CardPaymentStatus() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isDone, setDone] = React.useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    getUserPaymentStatus()
      .then((res) => {
        setDone(res);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      })
      .finally(() => {
        if (user.role === "PENGHUNI") {
          setOpen(true);
        }
      });
  }, []);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          severity={isDone ? "success" : "error"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle style={{ fontWeight: "bold" }}>
            INFO PEMBAYARAN
          </AlertTitle>
          {isDone
            ? `Terimakasih ${user.name}, Kamu sudah membayar uang kos bulan ini!`
            : `${user.name}, Kamu belum membayar uang kos bulan ini! Segara bayar yaa! ;)`}
        </Alert>
      </Collapse>
    </div>
  );
}
