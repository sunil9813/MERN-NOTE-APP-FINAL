import { makeStyles } from "@material-ui/core/styles"
import { deepPurple } from "@material-ui/core/colors"

export default makeStyles((theme) => ({
  appBar: {
    //borderRadius: 15,
    margin: "0 0 30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
  },
  heading: {
    color: "#2c3e50",
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginLeft: "15px",
    marginRight: "15px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "150px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    textTransform: "uppercase",
    cursor: "pointer",
  },
}))
