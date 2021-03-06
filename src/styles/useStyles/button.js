import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  root: {
    background: "linear-gradient(45deg, #ab6bfe 30%, #5a8bf6 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",

    transition: "font-size 0.3s",

    "&:hover": {
      background: "linear-gradient(45deg, #8245d3 30%, #5a8bf6 90%)",
      fontSize: 15.5
    }
  }
}));
