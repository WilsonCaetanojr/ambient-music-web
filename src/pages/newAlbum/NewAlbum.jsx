import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./newAlbum.css";
import { Input, InputLabel, FormControl, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import useStyle from "../../styles/useStyles/button";

const NewAlbum = () => {
  const { goBack } = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const classes = useStyle();

  const handleSelectImages = e => {
    if (!e.target.files[0]) return;

    //   if (!validTypeImage(e.target.files)) {
    // return notify(
    //   "Respeite os formatos permitidos para o anexo: PNG, JPEG e JPG."
    // );
    //   }

    setImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

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
                  <label className="title">Novo álbum</label>
                </div>

                <FormControl className="formControl" id="controlUser">
                  <InputLabel>Nome</InputLabel>
                  <Input
                    required
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </FormControl>

                <FormControl className="formControl" id="controlUser">
                  <InputLabel>Descrição</InputLabel>
                  <Input
                    required
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </FormControl>

                <div className="container-button">
                  <Button variant="contained" className={classes.root}>
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewAlbum;
