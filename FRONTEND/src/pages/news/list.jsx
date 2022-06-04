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
import { getAllNews, deleteNews, sendNews } from "services/news";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";
import { Td, Tr } from "components/green-table";
import moment from "moment";
import "moment/locale/id";
import HistoryIcon from "@material-ui/icons/History";
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
    history.push("/news/add");
  }

  function handleEdit(id) {
    history.push(`/news/edit/${id}`);
  }

  function handleDelete(id) {
    setLoading(true);
    const yes = window.confirm(
      "Apakah kamu yakin ingin menghapus berita ini ?"
    );
    if (yes) {
      deleteNews(id).then((res) => {
        console.log(res);
        fetchData();
        alert("Berita berhasil dihapus!");
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }

  function handleSend(id) {
    setLoading(true);
    const yes = window.confirm("Apakah kamu yakin ingin mengirim berita ini?");
    if (yes) {
      sendNews(id).then((res) => {
        console.log(res);
        fetchData();
        alert("Berita berhasil dikirim ke semua anak kos!");
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
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
        {isPemilik() && (
          <Button
            variant="contained"
            color="primary"
            endIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Tambah Berita
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
                <Td>Isi Berita</Td>
                <Td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <HistoryIcon style={{ marginRight: 4 }} />{" "}
                    {isPemilik() ? "Terakhir dikirim" : "Dikirim sejak"}
                  </div>
                </Td>
                {isPemilik() && <Td align="center">Aksi</Td>}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, key) => (
                  <Tr key={row.id} hover>
                    <Td>{page * rowsPerPage + key + 1}</Td>
                    <Td>
                      <pre>
                        {row.content.length > 70
                          ? row.content.substr(0, 70) + "..."
                          : row.content}
                      </pre>
                    </Td>
                    <Td>
                      {row.last_sent === null
                        ? "Belum pernah dikirim"
                        : moment(row.last_sent).locale("id").fromNow()}
                    </Td>
                    {isPemilik() && (
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
                        <IconButton
                          style={{ color: "#1976D2" }}
                          onClick={() => handleSend(row.id)}
                        >
                          <SendIcon />
                        </IconButton>
                      </Td>
                    )}
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
