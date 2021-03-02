import { Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import ClearIcon from "@material-ui/icons/Clear";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./newAlbum.css";
import "../../styles/global.css";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));

const NewAlbum = ({ setOpenModal, openModal }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Dialog
      open={openModal}
      // onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="container-close">
        <ClearIcon
          className="button-close"
          onClick={() => setOpenModal(false)}
        />
      </div>

      <DialogContent>
        <form className={classes.root} noValidate autoComplete="off">
          <DialogTitle id="alert-dialog-title">Novo Álbum</DialogTitle>
          <TextField
            id="standard-basic"
            label="Nome"
            className="input-new-album"
          />
          <TextField
            id="standard-basic"
            label="Descrição"
            className="input-new-album"
          />
          <Button variant="contained" className="color-save-button">
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default NewAlbum;
