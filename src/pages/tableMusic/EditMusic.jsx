import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Input, InputLabel, FormControl, Button } from "@material-ui/core";
import Navbar from "../../components/navbar/Navbar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Loading from "../../components/loading/Loading";
import SelectInput from "../../components/basic/SelectInput";
import api from "../../services/api";
import notify from "../../utils/notify";

const EditAlbum = () => {
  const { goBack } = useHistory();
  const [name, setName] = useState(null);
  const [optionsName, setOptionsName] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (name && name.Url) setUrl(name.Url);
    else setUrl("");
  }, [name]);

  useEffect(() => {
    const getMusicsUser = async () => {
      try {
        setLoading(true);

        const { data } = await api.get("/musics");

        if (data.success) setOptionsName(data.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    getMusicsUser();
  }, []);

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      setLoading(true);

      if (!name || !name.Id) {
        setLoading(false);
        return notify("Selecione uma música exitente.");
      }

      if (name.Url === url) {
        setLoading(false);
        return notify("Não foi identificado alterações na URL.");
      }

      const { data } = await api.put(`musics/${name.Id}`, { Url: url });

      if (data.success) notify("Música editada com sucesso.", true, "info");

      const indexMusic = optionsName.findIndex(i => i.Id === name.Id);
      const copy = [...optionsName];
      copy[indexMusic].Url = url;

      setOptionsName(copy);
      setName(null);

      setLoading(false);
    } catch (error) {
      setLoading(false);
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
                  <label className="title">Editar música</label>
                </div>
                <SelectInput
                  loading={loading}
                  label="Nome"
                  keyObject="Name"
                  lg={3}
                  value={name}
                  setValue={setName}
                  key="select-type-promoter"
                  optionsList={optionsName}
                />

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

export default EditAlbum;
