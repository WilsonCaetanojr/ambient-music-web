import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./newAlbum.css";
import {
  Input,
  IconButton,
  InputLabel,
  FormControl,
  TextField,
  MenuItem,
  Button
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const NewAlbum = () => {
  const { goBack } = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [screenAccess, setScreenAccess] = useState(0);
  const [active, setActive] = useState(true);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

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
        <Sidebar />

        <form onSubmit={handleSubmit}>
          {/* {loading && <ModalLoading loading={loading} />} */}
          <div className="containerFormUser">
            <div className="wrapper fadeInDown">
              <div id="formContent">
                <ArrowBackIcon className="iconGoBack" onClick={goBack} />

                <label className="title">Novo álbum</label>

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

                <Button variant="contained" className="color-save-button">
                  Salvar
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewAlbum;
