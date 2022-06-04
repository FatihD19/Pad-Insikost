import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { Td, Tr } from "components/green-table";

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

export default function CustomizedTables({ rows, handleDelete, handleEdit }) {
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = React.useState(true);

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

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={classes.table} stickyHeader>
            <TableHead>
              <TableRow>
                <Td>#</Td>
                <Td>Foto</Td>
                <Td>Nama</Td>
                <Td>Nomor HP</Td>
                {rows[0]?.role === "PENGHUNI" && <Td>Kamar</Td>}
                <Td>Role</Td>
                <Td>Status</Td>
                <Td align="center">Aksi</Td>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, key) => (
                  <Tr key={row.id} hover>
                    <Td>{page * rowsPerPage + key + 1}</Td>
                    <Td>
                      <Avatar src={row.photo_url} />
                    </Td>
                    <Td>{row.name}</Td>
                    <Td>{row.phone}</Td>
                    {row.role === "PENGHUNI" && <Td>{row.room_name}</Td>}
                    <Td>{row.role}</Td>
                    <Td>
                      <Status active={row.status} />
                    </Td>
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
