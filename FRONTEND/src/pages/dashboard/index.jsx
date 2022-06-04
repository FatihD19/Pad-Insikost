import React from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Chart from "components/dashboard/Chart";
import Info from "components/dashboard/Info";
import WifiIcon from "@material-ui/icons/Wifi";
import HotelTwoToneIcon from "@material-ui/icons/HotelTwoTone";
import MonetizationOnTwoToneIcon from "@material-ui/icons/MonetizationOnTwoTone";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import { getCharts } from "services/dashboard";
import { formatRupiah } from "utils";
import Button from "@material-ui/core/Button";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    minHeight: "80vh",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  title: {
    fontWeight: "bold",
  },
  icon: {
    fontSize: 120,
    color: "rgba(0,0,0,0.1)",
    transform: "rotate(30deg)",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = React.useState({
    chart: [],
    count: {
      penghuni: "?",
      rooms: "?",
      facilities: "?",
      payments: "?",
    },
  });

  function fetchData() {
    getCharts().then((res) => {
      setData(res);
    });
  }
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={classes.container}>
      <Grid container spacing={4} justify="center">
        <Grid item xs={12} sm={4} md={3}>
          <Info
            title={
              data.count.payments !== "?"
                ? formatRupiah(data.count.payments)
                : data.count.payments
            }
            subtitle="Total Pendapatan"
            color="rgba(27, 170, 86, 1)"
            shadowColor="rgba(27, 170, 86, 0.3)"
            icon={<MonetizationOnTwoToneIcon className={classes.icon} />}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Info
            title={data.count.rooms}
            subtitle="Kamar"
            color="rgba(27, 170, 86, 1)"
            shadowColor="rgba(27, 170, 86, 0.3)"
            icon={<HotelTwoToneIcon className={classes.icon} />}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Info
            title={data.count.facilities}
            subtitle="Fasilitas"
            color="rgba(27, 170, 86, 1)"
            shadowColor="rgba(27, 170, 86, 0.3)"
            icon={<WifiIcon className={classes.icon} />}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Info
            title={data.count.penghuni}
            subtitle="Penghuni"
            color="rgba(27, 170, 86, 1)"
            shadowColor="rgba(27, 170, 86, 0.3)"
            icon={<AccountCircleTwoToneIcon className={classes.icon} />}
          />
        </Grid>
      </Grid>

      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.titleContainer}
      >
        <Typography variant="h6" color="primary" className={classes.title}>
          Statistik Pembayaran Tahun {new Date().getFullYear()}
        </Typography>
        <Button
          style={{ color: "grey" }}
          endIcon={<ArrowForwardIcon />}
          onClick={() => history.push("/payments")}
        >
          Lihat detail
        </Button>
      </Grid>
      <Chart chartData={data.chart} height={100} />
    </div>
  );
}
