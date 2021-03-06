import { useState } from "react";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./login.css";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import useStyle from "../../styles/useStyles/button";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

        <div className="container-inputs">
          <TextField
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input-email"
            id="email"
            label="Email"
          />
          <FormControl className="input-password">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <div className="create-account">
            <Link
              component="button"
              variant="body"
              onClick={() => push("register")}
              className="link-create-account"
            >
              Criar conta
            </Link>
          </div>
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
