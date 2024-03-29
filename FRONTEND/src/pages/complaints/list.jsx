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
import { getComplaints, deleteComplaint } from "services/complaints";
import AddIcon from "@material-ui/icons/Add";
import { Td, Tr } from "components/green-table";
import PlaceholderPhoto from "assets/placeholder-photo.png";
import { isPemilik } from "utils";

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
  KOSONG: {
    padding: "4px 12px",
    borderRadius: 4,
    color: "#AAA",
    background: "#EEE",
  },
  TERISI: {
    padding: "4px 12px",
    borderRadius: 4,
    color: "rgba(27, 170, 86, 1)",
    background: "rgba(27, 170, 86, 0.2)",
  },
  NONAKTIF: {
    padding: "4px 12px",
    borderRadius: 4,
    color: "rgba(220, 0, 78, 1)",
    background: "rgba(220, 0, 78, 0.2)",
  },
  photo: {
    borderRadius: 10,
    height: 50,
  },
}));

const Status = ({ type }) => {
  const classes = useStyles();
  return <span className={classes[type]}>{type}</span>;
};

const title = "List Pelaporan";

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
    getComplaints()
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
    history.push("/complaints/add");
  }

  function handleEdit(id) {
    history.push(`/complaints/edit/${id}`);
  }

  function handleDelete(id) {
    setLoading(true);
    const yes = window.confirm("Apakah kamu yakin ingin?");
    if (yes) {
      deleteComplaint(id).then((res) => {
        console.log(res);
        fetchData();
        alert("Pelaporan berhasil dihapus!");
      });
    }
    setLoading(false);
  }

  function addDefaultSrc(e) {
    e.target.src = PlaceholderPhoto;
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

        {!isPemilik() && (
          <Button
            variant="contained"
            color="primary"
            endIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Tambah Pelaporan
          </Button>
        )}
      </Grid>

      {loading && <LinearProgress />}

      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={classes.table} stickyHeader>
            <TableHead>
              <TableRow>
                <Td>#</Td>
                <Td>Foto</Td>
                <Td>Pelapor</Td>
                <Td>Isi pesan</Td>
                <Td align="center">Aksi</Td>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, key) => (
                  <Tr key={row.id} hover>
                    <Td>{page * rowsPerPage + key + 1}</Td>
                    <Td>
                      <img
                        src={row.photo_url || PlaceholderPhoto}
                        className={classes.photo}
                        onError={addDefaultSrc}
                      />
                    </Td>
                    <Td>{row.user?.name || "-"}</Td>
                    <Td>
                      <pre>{row.content}</pre>
                    </Td>
                    <Td align="center">
                      {!isPemilik() && (
                        <IconButton
                          style={{ color: "#FEC53C" }}
                          onClick={() => handleEdit(row.id)}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
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
