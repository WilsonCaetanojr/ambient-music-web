import { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import Navbar from "../../components/navbar/Navbar";
import { Input, InputLabel, FormControl, Button } from "@material-ui/core";
import { UserContext } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";
import { api } from "../../services/api";
import "./myAccount.css";
import { changedValues } from "../../utils/changedValues";

const MyAccount = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user.Name);
  const [email, setEmail] = useState(user.Email);
  const [initialState, setInitialState] = useState({
    Name: user.Name,
    Email: user.Email,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const body = changedValues({
        initial: initialState,
        current: { Email: email, Name: name },
      });

      if (Object.keys(body).length < 1) return setLoading(false);

      await api.put(`users/${user.Id}`, body);

      setUser(body);
      setInitialState(Object.assign(initialState, body));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <Loading loading={loading} />
      <div className="profileContainer">
        <div className="containerFormUser">
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="header-account">
                <Avatar
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  className="avatar-my-account"
                >
                  <label className="labelAvatar">
                    {user && user.Name
                      ? user.Name.substring(0, 1).toUpperCase()
                      : "-"}
                  </label>
                </Avatar>
                <strong>{user.Name}</strong>
                <div>
                  <p>
                    <LibraryMusicIcon className="icon-album-my-account" />
                    Você possui 33 álbuns
                  </p>
                </div>
              </div>

              <FormControl className="form-control-account">
                <InputLabel>Nome</InputLabel>
                <Input
                  required
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </FormControl>

              <FormControl className="form-control-account">
                <InputLabel>E-mail</InputLabel>
                <Input
                  required
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormControl>

              <div className="container-btn-account">
                <Button
                  variant="contained"
                  className="buton-gradient"
                  onClick={handleSubmit}
                >
                  Atualizar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
