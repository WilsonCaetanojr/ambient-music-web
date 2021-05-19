import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import "./loading.css";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Loading = ({ loading = false }) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={loading}>
      <div className="container-loading">
        <img src="./images/loading.gif" alt="loading" />
      </div>
    </Backdrop>
  );
};

export default Loading;
