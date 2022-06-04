import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { getUsers, deleteUser } from "services/users";
import AddIcon from "@material-ui/icons/Add";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "./table";
import ButtonExportExcel from "./button-export-excel.jsx";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

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

const Status = ({ active }) => {
  const classes = useStyles();
  return (
    <span className={active ? classes.statusActive : classes.statusInactive}>
      {active ? "AKTIF" : "TIDAK AKTIF"}
    </span>
  );
};

const title = "List Pengguna";

export default function CustomizedTables() {
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = React.useState(true);
  const [rowsPemilik, setRowsPemilik] = React.useState([]);
  const [rowsPenghuni, setRowsPenghuni] = React.useState([]);

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
    getUsers()
      .then((res) => {
        setRowsPemilik(
          res
            .filter((item) => item.role === "PEMILIK")
            .map((row, key) => ({
              no: key + 1,
              id: row.id,
              photo_url: row.photo_url,
              name: row.name || "-",
              phone: row.phone,
              room_name: row.room?.name || "-",
              role: row.role,
              status: row.room?.name || row.role === "PEMILIK",
            }))
        );
        setRowsPenghuni(
          res
            .filter((item) => item.role === "PENGHUNI")
            .map((row, key) => ({
              no: key + 1,
              id: row.id,
              photo_url: row.photo_url,
              name: row.name || "-",
              phone: row.phone,
              room_name: row.room?.name || "-",
              role: row.role,
              status: row.room?.name || row.role === "PEMILIK",
            }))
        );
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  console.log("rowsPemilik", rowsPemilik);
  console.log("rowsPenghuniPemilik", rowsPenghuni);

  React.useEffect(() => {
    fetchData();
  }, []);

  function handleAdd() {
    history.push("/users/add");
  }

  function handleEdit(id) {
    history.push(`/users/edit/${id}`);
  }

  function handleDelete(id) {
    setLoading(true);
    const yes = window.confirm("Apakah kamu yakin ingin?");
    if (yes) {
      deleteUser(id).then((res) => {
        console.log(res);
        fetchData();
        alert("Pengguna berhasil dihapus!");
      });
    }
    setLoading(false);
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

        <div>
          <ButtonExportExcel
            data={rowsPenghuni}
            style={{ marginRight: 10 }}
            text="EXPORT EXCEL PENGHUNI"
            filename="DATA PENGHUNI"
          />
          <ButtonExportExcel
            data={rowsPemilik}
            style={{ marginRight: 10 }}
            text="EXPORT EXCEL PEMILIK"
            filename="DATA PEMILIK"
          />

          <Button
            variant="contained"
            color="primary"
            endIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Tambah Pengguna
          </Button>
        </div>
      </Grid>

      {loading && <LinearProgress />}

      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Penghuni" />
          <Tab label="Pemilik" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Table
          rows={rowsPenghuni}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Table
          rows={rowsPemilik}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </TabPanel>
    </React.Fragment>
  );
}
