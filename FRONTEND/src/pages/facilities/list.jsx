import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import LinearProgress from "@material-ui/core/LinearProgress";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { getFacilities, deleteFacility } from "services/facilities";
import AddIcon from "@material-ui/icons/Add";
import { Td, Tr } from "components/green-table";

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

const title = "List Fasilitas";

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
    getFacilities()
      .then((res) => {
        setRows(res);
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

  function handleAdd() {
    history.push("/facilities/add");
  }

  function handleEdit(id) {
    history.push(`/facilities/edit/${id}`);
  }

  function handleDelete(id) {
    setLoading(true);
    const yes = window.confirm("Apakah kamu yakin ingin?");
    if (yes) {
      deleteFacility(id).then((res) => {
        console.log(res);
        fetchData();
        alert("Fasilitas berhasil dihapus!");
      });
    }
    setLoading(false);
  }

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

        <Button
          variant="contained"
          color="primary"
          endIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Tambah Fasilitas
        </Button>
      </Grid>

      {loading && <LinearProgress />}

      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={classes.table} stickyHeader>
            <TableHead>
              <TableRow>
                <Td>#</Td>
                <Td>Nama</Td>
                <Td align="center">Aksi</Td>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, key) => (
                  <Tr key={row.id} hover>
                    <Td>{page * rowsPerPage + key + 1}</Td>
                    <Td>{row.name}</Td>
                    <Td align="center">
                      <IconButton
                        style={{ color: "#FEC53C" }}
                        onClick={() => handleEdit(row.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        style={{ color: "#DC004E" }}
                        onClick={() => handleDelete(row.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Td>
                  </Tr>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </React.Fragment>
  );
}
