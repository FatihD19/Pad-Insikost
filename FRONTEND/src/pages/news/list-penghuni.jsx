import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { getAllNews } from "services/news";
import moment from "moment";
import "moment/locale/id";
import Alert from "@material-ui/lab/Alert";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  title: {
    fontWeight: "bold",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  statusActive: {
    padding: "4px 12px",
    borderRadius: 4,
    color: "rgba(27, 170, 86, 1)",
    background: "rgba(27, 170, 86, 0.2)",
  },
  statusInactive: {
    padding: "4px 12px",
    borderRadius: 4,
    color: "rgba(220, 0, 78, 1)",
    background: "rgba(220, 0, 78, 0.2)",
  },
}));

const title = "List Berita";

export default function CustomizedTables() {
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = React.useState(true);
  const [rows, setRows] = React.useState([]);

  // PAGINATION
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function fetchData() {
    setLoading(true);
    getAllNews()
      .then((res) => {
        setRows(res.filter((row) => row.last_sent !== null));
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        style={{ marginBottom: 15 }}
      >
        <Typography variant="h6" color="primary" className={classes.title}>
          {title}
        </Typography>
      </Grid>

      {loading && <LinearProgress />}

      <Paper className={classes.paper} style={{ padding: 20 }}>
        {rows.length === 0 && (
          <Typography variant="subtitle1" className={classes.title}>
            Tidak ada berita.
          </Typography>
        )}
        {rows.map((row, key) => (
          <Alert
            icon={<InfoOutlinedIcon fontSize="inherit" />}
            severity="success"
            key={key}
            style={{
              marginBottom: key + 1 !== rows.length ? 15 : 0,
            }}
          >
            {row.content}
            <div style={{ fontWeight: "bold" }}>
              {row.last_sent === null
                ? "Belum pernah dikirim"
                : moment(row.last_sent).locale("id").fromNow()}
            </div>
          </Alert>
        ))}
      </Paper>
    </React.Fragment>
  );
}
