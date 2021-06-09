import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Input, InputLabel, FormControl, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import SelectInput from "../../components/basic/SelectInput";
import { api } from "../../services/api";
import { notify } from "../../utils/notify";
import validTypeFile from "../../utils/validTypeFile";
import "./album.css";
import getBase64 from "../../utils/getBase64";

const NewAlbum = () => {
  const { goBack } = useHistory();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [optionsMusics, setOptionMusics] = useState([]);
  const [intensity, setIntensity] = useState(null);
  const [musicsSelects, setMusicsSelects] = useState([null]);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    try {
      const getOptionsMusics = async () => {
        const { data } = await api.get("/musics");

        setOptionMusics(data.data);
      };

      getOptionsMusics();
    } catch (error) {
      setLoading(false);
      console.log("useEffect music NewAlbum ERROR", error);
    }
  }, []);

  const handleSelectImages = (e) => {
    if (!e.target.files[0]) return;

    if (
      !validTypeFile({
        file: e.target.files[0],
        types: ["png", "PNG", "jpg", "JPG", "jpeg", "JPEG"],
      })
    ) {
      return notify("A imagem deve respeitar os formatos: PNG, JPEG ou JPG.");
    }

    if (e.target.files[0].size / 1024 / 1024 > 10) {
      return notify("A imagem deve respeitar o tamanho máximo de 10 MB.");
    }

    setImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const body = {
        Name: name,
        Description: description,
        Intensity: intensity.Id,
        Musics: musicsSelects,
      };

      if (image) {
        const base64 = await getBase64(image);
        body.Image = base64 || null;
      }

      await api.post("/albums", body);

      notify("Tema cadastrado com sucesso", true, "info");
      setName("");
      setDescription("");
      setIntensity(null);
      setMusicsSelects([null]);
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
                  <label className="title">Novo tema</label>
                </div>

                <div
                  style={{
                    width: "100%",
                    marginTop: "2%",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  {previewImage && previewImage !== "" && (
                    <img
                      alt="ImageAlbum"
                      src={previewImage}
                      className="preview"
                    />
                  )}
                  <div>
                    <label className="label-upload">
                      {previewImage && previewImage.length > 1
                        ? "Alterar"
                        : "Adicionar imagem"}
                      <input
                        className="input-file"
                        accept="image/png, image/jpeg, image/jpg,"
                        type="file"
                        name="image"
                        onChange={handleSelectImages}
                        value=""
                      />
                    </label>
                    {previewImage && previewImage.length > 1 && (
                      <label
                        className="remove-file"
                        onClick={() => {
                          setImage(null);
                          setPreviewImage(null);
                        }}
                      >
                        Remover
                      </label>
                    )}
                  </div>
                </div>

                <FormControl className="formControl" id="controlUser">
                  <InputLabel>Nome</InputLabel>
                  <Input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>

                <FormControl className="formControl" id="controlUser">
                  <InputLabel>Descrição</InputLabel>
                  <Input
                    required
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>

                <SelectInput
                  required
                  label="Intensidade"
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
                    onChange={(value) => {
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

export default NewAlbum;
