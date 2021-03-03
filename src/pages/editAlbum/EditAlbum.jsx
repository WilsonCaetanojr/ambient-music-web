import { useState, cloneElement } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./editAlbum.css";
import {
  IconButton,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Grid,
  ListItemSecondaryAction,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./editAlbum.css";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function generate(element) {
  return [0, 1, 2].map(value =>
    cloneElement(element, {
      key: value,
    })
  );
}

const EditAlbum = () => {
  const { goBack } = useHistory();
  const classes = useStyles();
  const [dense, setDense] = useState(false);
  const [album, setAlbum] = useState(null);

  const handleSubmit = async e => {};

  return (
    <>
      <div className="container-home">
        <Navbar />

        <form onSubmit={handleSubmit}>
          {/* {loading && <ModalLoading loading={loading} />} */}
          <div className="containerFormUser">
            <div className="wrapper fadeInDown">
              <div id="formContent">
                <div className="container-title">
                  <ArrowBackIcon className="iconGoBack" onClick={goBack} />
                  <label className="title">Editar álbum</label>
                </div>

                <div className="row-container-edit">
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Álbum
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={album}
                      onChange={value => setAlbum(value.target.value)}
                    >
                      <MenuItem value="">
                        <em>-</em>
                      </MenuItem>
                      <MenuItem value={10}>Ex1</MenuItem>
                      <MenuItem value={20}>Ex2</MenuItem>
                      <MenuItem value={30}>Ex3</MenuItem>
                    </Select>
                    {/* <FormHelperText>Some important helper text</FormHelperText> */}
                  </FormControl>
                  <img
                    src="./images/interrogation.png"
                    className="preview-img"
                  />
                </div>
                {album && (
                  <div className="container-edit">
                    <Grid item xs={12} md={12}>
                      <div className={classes.demo}>
                        <List dense={dense}>
                          {generate(
                            <ListItem>
                              <ListItemAvatar>
                                <img
                                  src="./images/noteMusic.png"
                                  style={{ width: 30 }}
                                />
                              </ListItemAvatar>
                              <ListItemText primary="Músicas" />
                              <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                  <img
                                    src="./icons/delete.svg"
                                    style={{ width: 18 }}
                                  />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          )}
                        </List>
                      </div>
                    </Grid>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditAlbum;
