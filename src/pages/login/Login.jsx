import "./login.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const Login = () => {

    const classes = useStyles();
    

    return (
        <div className="pai-div">
            <div className="container-login">

                <div className="container-login2">
                    <img className="title-login" src="./images/fundooo.png" />
                </div>

                <div className="container-input">
                    <TextField className="input-login" id="standard-basic" label="Login" />
                    <TextField className="input-senha" type="password" id="standard-basic" label="Senha" />
                </div>

                <div className="button-login">
                    <Button className="button-ajuste" variant="contained" color="primary">
                        Entrar </Button>


                </div>

            </div>
        </div>
    );
}
export default Login;