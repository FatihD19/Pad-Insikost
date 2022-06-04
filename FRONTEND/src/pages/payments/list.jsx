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
import { getPayments, deletePayment, editRejected, editAccepted } from "services/payments";
import AddIcon from "@material-ui/icons/Add";
import { Td, Tr } from "components/green-table";
import PlaceholderPhoto from "assets/placeholder-photo.png";
import { formatRupiah, formatBulan, isPemilik, isPenghuni } from "utils";
import moment from "moment";
import "moment/locale/id";
// import { isPemilik } from "utils";
// import { isPenghuni } from "utils";
import CardPaymentStatus from "components/card-payment-status";
import ButtonExportExcel from "./button-export-excel.jsx";
import Modal from "components/modal/Modal.jsx";

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

const title = "List Pembayaran";

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
    getPayments()
      .then((res) => {
        setRows(
          res.map((row, key) => ({
            no: key + 1,
            id: row.id,
            foto: row.photo_url || PlaceholderPhoto,
            penghuni: row.user?.name || "-",
            kamar: row.room?.name || "-",
            harga_kamar: formatRupiah(row.nominal),
            uang_diterima: formatRupiah(row.uang_diterima),
            uang_kembalian: formatRupiah(row.uang_kembalian),
            periode: `${formatBulan(row.month)} ${row.year}`,
            status: row.status,
            tanggal: moment(row.created_at)
              .locale("id")
              .format("DD MMMM YYYY, HH:mm"),
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

  //pop up modal
  const [openModal, setOpenModal] = React.useState(false)
  const [rowID, setRowID] = React.useState('')
  


  React.useEffect(() => {
    fetchData();
  }, []);

  function handleAdd() {
    history.push("/payments/add");
  }

  function handleEdit(id) {
    history.push(`/payments/edit/${id}`);
  }

  function handleDelete(id) {
    setLoading(true);
    const yes = window.confirm("Apakah kamu yakin ingin?");
    if (yes) {
      deletePayment(id).then((res) => {
        console.log(res);
        fetchData();
        alert("Pembayaran berhasil dihapus!");
      });
    }
    setLoading(false);
  }
  //tambahan
  function handleStatusRejected(id) {
    setLoading(true);
    const yes = window.confirm("Ubah status pembayaran menjadi di tolak?");
    if (yes) {
      editRejected(id).then((res) => {
        console.log(res);
        fetchData();
        alert("Status Pembayaran Berubah Menjadi REJECTED")
      });
    }
    setLoading(false);
  }

  function handleStatusAccepted(id) {
    setLoading(true);
    const yes = window.confirm("Ubah status pembayaran menjadi di terima?");
    if (yes) {
      editAccepted(id).then((res) => {
        console.log(res);
        fetchData();
        alert("Status Pembayaran Berubah Menjadi ACCEPTED")
      });
    }
    setLoading(false);
  }
  
  // function eventClickOption (pick, id) {
  //   if (pick == 'terima') {
  //     editAccepted(id).then((res) => {
  //       console.log(res);
  //       fetchData();
  //       alert("Status Pembayaran Berubah Menjadi ACCEPTED")
  //     });
  //   } 
  //   else {
  //     editRejected(id).then((res) => {
  //       console.log(res);
  //       fetchData();
  //       alert("Status Pembayaran Berubah Menjadi REJECTED")
  //     });
  //   }
  // }
  // function handelAddStatus(id) {
  // }

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

        {isPemilik() && (
          <div>
            <ButtonExportExcel data={rows} />

            <Button
              variant="contained"
              color="primary"
              endIcon={<AddIcon />}
              onClick={handleAdd}
              style={{ marginLeft: 10 }}
            >
              Tambah Pembayaran
            </Button>
          </div>
        )}
        {isPenghuni() && (
          <div>

            <Button
              variant="contained"
              color="primary"
              endIcon={<AddIcon />}
              onClick={handleAdd}
              style={{ marginLeft: 10 }}
            >
              Tambah Pembayaran
            </Button>
          </div>
        )}
      </Grid>

      <CardPaymentStatus />

      {loading && <LinearProgress />}

      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={classes.table} stickyHeader>
            <TableHead>
              <TableRow>
                <Td>#</Td>
                <Td>Foto</Td>
                <Td>Penghuni</Td>
                {/* <Td>Kamar</Td>
                <Td>Harga Kamar</Td> */}
                <Td>Uang diterima</Td>
                {/* <Td>Uang kembalian</Td> */}
                <Td>Periode</Td>
                {/* <Td>Tanggal</Td> */}
                {isPemilik() && <Td align="center">Status Pembayaran</Td>}
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
                      <img
                        src={row.foto}
                        className={classes.photo}
                        onError={addDefaultSrc}
                      
                      />
                     
                    </Td>
                    <Td>{row.penghuni}</Td>
                    {/* <Td>{row.kamar}</Td>
                    <Td>{row.harga_kamar}</Td> */}
                    <Td>{row.uang_diterima}</Td>
                    {/* <Td>{row.uang_kembalian}</Td> */}
                    <Td>{row.periode}</Td>
      
                    {/* <Td>{row.tanggal}</Td> */}
                    {isPemilik() && (
                      <Td align="center">
                        {row.status == null &&
                          <>
                            <Button
                            variant="contained"
                            color="secondary"
                            onClick={ function() {
                              setRowID(row.id);
                              setOpenModal(true);
                            }} 
                            >
                              <span>Not Yet</span>
                            </Button>
                            <Modal open={openModal} onClose={() => setOpenModal(false)} handleAccepted={handleStatusAccepted} handleRejected={handleStatusRejected} onPick={rowID}/>
                          </>}
                        {row.status == 'accepted' &&
                          <>
                            <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleStatusRejected(row.id)}
                            >
                              {row.status == 'accepted' ? <span>Confirmed</span> : <span>{row.status}</span>}
                            </Button>
                          </>}
                        {row.status == 'rejected' &&
                          <>
                            <Button
                            variant="contained"
                            style={{ 
                              backgroundColor: 'red',
                              color: 'white'
                             }}
                            onClick={() => handleStatusAccepted(row.id)}
                            >
                              <span>{row.status}</span>
                            </Button>
                          </>}
                       
                        
                          
                         
                      </Td>
                    )}
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
