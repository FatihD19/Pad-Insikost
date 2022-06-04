import { makeStyles, withStyles } from "@material-ui/core/styles";
import { color } from "theme";

const useStyles = makeStyles((theme) => ({
  dialogDiv: {
    backgroundColor: color.primary,
    display: "flex",
    justifyContent: "space-between",
  },
  textDialog: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    paddingTop: 19,
    paddingLeft: 25,
    paddingBottom: 19,
  },
  input: {
    dislpay: "block",
    borderRadius: 6,
    padding: "4px 8px",
    background: "#FFF",
    border: "2px solid #DDD",
    color: "#000",
    width: "100%",
  },
}));

export default useStyles;
