import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./login.css";

const Login = () => {
  const { push } = useHistory();

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
            className="button-login"
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
