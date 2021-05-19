import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Input, InputLabel, FormControl, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import { api } from "../../services/api";
import SelectInput from "../../components/basic/SelectInput";
import Loading from "../../components/loading/Loading";
import { notify } from "../../utils/notify";
import "./album.css";

const EditAlbum = ({ location }) => {
  const { goBack } = useHistory();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [optionsMusics, setOptionMusics] = useState([]);
  const [intensity, setIntensity] = useState(null);
  const [musicsSelects, setMusicsSelects] = useState([null]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const getOptionsMusics = async () => {
      try {
        setLoading(true);

        const { data } = await api.get("/musics");

        setOptionMusics(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("useEffect music EditAlbum ERROR", error);
      }
    };

    getOptionsMusics();
  }, []);

  useEffect(() => {
    try {
      const getData = async () => {
        setLoading(true);

        const { data } = await api.get(`/albums/${location.state.Id}`);

        if (data.success) {
          const result = data.data[0];
          setName(result.Name);
          setPreviewImage(result.Image);
          setDescription(result.Description);
          setIntensity({ Id: result.Intensity.toString() });
          const musics = result.Musics || [];
          musics.push(null);
          setMusicsSelects(musics);
        }
      };

      if (location.state && location.state.Id) getData();

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("useEffect genre EditAlbum ERROR", error);
    }
  }, [location.state]);

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);

      await api.put(`/albums/${location.state.Id}`, {
        Musics: musicsSelects,
      });

      notify("Tema editado com sucesso", true, "info");
      goBack();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("handleSubmit EditAlbum ERROR", error);
    }
  };

  return (
    <>
      <div className="container-home">
        <Navbar />
        <form onSubmit={handleSubmit}>
          <Loading loading={loading} />
          <div className="containerFormUser">
            <div className="wrapper fadeInDown">
              <div id="formContent">
                <div className="container-title">
                  <ArrowBackIcon className="iconGoBack" onClick={goBack} />
                  <label className="title">Editar tema</label>
                </div>

                <div className="row-container-edit">
                  <img
                    alt="interrogation"
                    src={previewImage || "./images/interrogation.png"}
                    className="preview-img"
                  />
                </div>
                <FormControl className="formControl" id="controlUser">
                  <InputLabel>Nome</InputLabel>
                  <Input
                    disabled
                    required
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </FormControl>

                <FormControl className="formControl" id="controlUser">
                  <InputLabel>Descrição</InputLabel>
                  <Input
                    disabled
                    required
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </FormControl>

                <FormControl className="formControl" id="controlUser">
                  <InputLabel>Intensidade</InputLabel>
                  <Input
                    disabled
                    required
                    type="text"
                    value={intensity ? intensity.Id : "0"}
                  />
                </FormControl>

                {musicsSelects.map((music, index) => (
                  <SelectInput
                    label={
                      index === 0
                        ? "Adicionar música"
                        : "Adicionar outra música"
                    }
                    keyObject="Name"
                    lg={3}
                    value={musicsSelects[index]}
                    onChange={value => {
                      const copy = [...musicsSelects];

                      if (!value && (index !== 0 || copy.length > 1)) {
                        copy.splice(index, 1);
                      } else {
                        copy[index] = value;

                        if (index === copy.length - 1) {
                          copy[index + 1] = null;
                        }
                      }
                      setMusicsSelects(copy);
                    }}
                    key={index}
                    optionsList={optionsMusics}
                  />
                ))}

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
