import { useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
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
import { notify } from "../../utils/notify";
import { api } from "../../services/api";
import Loading from "../../components/loading/Loading";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const { push, goBack } = useHistory();

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);

      let error = false;

      if (password !== confirmPassword) {
        error = true;
        notify("As senhas estão diferentes.");
      }

      if (!email || !isEmail(email)) {
        error = true;
        notify("Email inválido.");
      }

      if (password.length < 5) {
        error = true;
        notify("a senha é muito curta");
      }

      if (error) return setLoading(false);

      const { data } = await api.post("/users", {
        Email: email,
        Password: password,
        FlagActive: true,
        Name: email.split("@")[0],
      });

      if (data.success) push("Login");
    } catch (error) {
      setLoading(false);
      console.log("handleSubmit Register ERROR", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Loading loading={loading} />
      <div className="full-screen-register">
        <div className="container-login-register">
          <div className="container-header-register">
            <ArrowBackIcon className="iconGoBack" onClick={goBack} />
            <img alt="logoLogin" src="./images/logoLogin.png" />
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
                      onClick={() =>
                        setShowconfirmPassword(!showconfirmPassword)
                      }
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
              className="buton-gradient"
              variant="contained"
              type="subimit"
            >
              Criar Conta
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Register;
