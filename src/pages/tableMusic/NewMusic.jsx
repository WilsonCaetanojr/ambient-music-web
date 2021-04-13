import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Input, InputLabel, FormControl, Button } from "@material-ui/core";
import Navbar from "../../components/navbar/Navbar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Loading from "../../components/loading/Loading";
import api from "../../services/api";
import "./newMusic.css";
import notify from "../../utils/notify";

const NewAlbum = () => {
  const { goBack } = useHistory();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);

      await api.post("/musics", { Name: name, Url: url });

      notify("Música cadastrada com sucesso", true, "info");
      setName("");
      setUrl("");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("handleSubmit NewMusic ERROR", err);
    }
  };

  return (
    <>
      <div className="container-home">
        <Navbar />

        <form onSubmit={handleSubmit}>
          {loading && <Loading loading={loading} />}
          <div className="containerFormUser">
            <div className="wrapper fadeInDown">
              <div id="formContent">
                <div className="container-title">
                  <ArrowBackIcon className="iconGoBack" onClick={goBack} />
                  <label className="title">Nova música</label>
                </div>

                <FormControl className="formControl" id="controlUser">
                  <InputLabel>Nome</InputLabel>
                  <Input
                    required
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value.substr(0, 50))}
                  />
                </FormControl>

                <FormControl className="formControl" id="controlUser">
                  <InputLabel>URL Youtube</InputLabel>
                  <Input
                    required
                    type="text"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                  />
                </FormControl>

                <div className="container-button">
                  <Button
                    variant="contained"
                    className="buton-gradient"
                    type="subimit"
                  >
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
