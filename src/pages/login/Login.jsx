import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./login.css";

const useStyle = makeStyles(theme => ({
  root: {
    background: "linear-gradient(45deg, #ab6bfe 30%, #5a8bf6 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    "&:hover": {
      background: "linear-gradient(45deg, #8245d3 30%, #5a8bf6 90%)"
    }
  }
}));

const Login = () => {
  const { push } = useHistory();
  const classes = useStyle();

  const handleSubmit = () => {
    push("homePage");
  };

  return (
    <div className="full-screen">
      <div className="container-login">
        <div className="container-img">
          <img src="./images/logoLogin.png" />
        </div>

        <div className="container-input">
          <TextField
            className="input-login"
            id="standard-basic"
            label="Login"
          />
          <TextField
            className="input-senha"
            type="password"
            id="standard-basic"
            label="Senha"
          />
        </div>

        <div className="container-button-login">
          <Button
            className={classes.root}
            variant="contained"
            onClick={handleSubmit}
          >
            Entrar
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Login;
