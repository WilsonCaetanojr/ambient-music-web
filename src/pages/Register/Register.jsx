import { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./register.css";
import Visibility from "@material-ui/icons/Visibility";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import isEmail from "../../utils/isEmail";
import useStyle from "../../styles/useStyles/button";

const Login = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const { push, goBack } = useHistory();
  const classes = useStyle();

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("As senhas estão diferentes");
    } else {
      if (!email || !isEmail(email)) {
        alert("Email incorreto");
      } else {
        if (password.length < 5) {
          alert("a senha é muito curta");
        } else {
          push("Login");
        }
      }
    }
  };

  return (
    <div className="full-screen-register">
      <div className="container-login-register">
        <div className="container-header-register">
          <ArrowBackIcon className="iconGoBack" onClick={goBack} />
          <img src="./images/logoLogin.png" />
        </div>
        <div className="container-inputs-register">
          <TextField
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="input-email-register"
            id="email"
            label="Email"
          />
          <FormControl className="input-password-register">
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
          <FormControl className="input-confirm-pass-register">
            <InputLabel htmlFor="standard-adornment-confirmPassword">
              Confirm Password
            </InputLabel>
            <Input
              id="standard-adornment-confirmPassword"
              type={showconfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={e => setconfirmPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirmPassword visibility"
                    onClick={() => setShowconfirmPassword(!showconfirmPassword)}
                  >
                    {showconfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <div className="container-button-login-register">
          <Button
            className={classes.root}
            variant="contained"
            onClick={handleSubmit}
          >
            Criar Conta
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Login;
