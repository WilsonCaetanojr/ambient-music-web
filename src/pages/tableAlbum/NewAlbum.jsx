import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Input, InputLabel, FormControl, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import SelectInput from "../../components/basic/SelectInput";
import api from "../../services/api";
import notify from "../../utils/notify";
import "./album.css";

const NewAlbum = () => {
  const { goBack } = useHistory();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [optionsGenre, setOptionGenre] = useState([]);
  const [genre, setGenre] = useState(null);
  const [intensity, setIntensity] = useState(null);

  useEffect(() => {
    try {
      const getOptionsGenre = async () => {
        const { data } = await api.get("/genres");

        setOptionGenre(data.data);
      };

      getOptionsGenre();
    } catch (error) {
      setLoading(false);
      console.log("useEffect NewAlbum ERROR", error);
    }
  }, []);

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);

      await api.post("/albums", {
        Name: name,
        Description: description,
        Genre: genre.Id,
        Intensity: intensity.Id,
      });

      notify("Álbum cadastrado com sucesso", true, "info");
      setName("");
      setDescription("");
      setGenre(null);
      setIntensity(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("handleSubmit NewAlbum ERROR", error);
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

                <SelectInput
                  label="Gênero"
                  keyObject="Name"
                  lg={3}
                  value={genre}
                  setValue={setGenre}
                  key="select-genre"
                  optionsList={optionsGenre}
                />

                <SelectInput
                  label="Intencidade"
                  keyObject="Id"
                  lg={3}
                  value={intensity}
                  setValue={setIntensity}
                  key="select-intensity"
                  optionsList={[
                    { Id: "1" },
                    { Id: "2" },
                    { Id: "3" },
                    { Id: "4" },
                  ]}
                />

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
