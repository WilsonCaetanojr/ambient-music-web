import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import Navbar from "../../components/navbar/Navbar";
import { Input, InputLabel, FormControl, Button } from "@material-ui/core";
import "./myAccount.css";

const MyAccount = () => {
  const [name, setName] = useState("Wilson Caetano");
  const [email, setEmail] = useState("wilsonjr_caetano@hotmail.com");

  return (
    <>
      <Navbar />
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
                    {"user" && "user.Nome"
                      ? "Wilson".substring(0, 1).toUpperCase()
                      : "A"}
                  </label>
                </Avatar>
                <strong>Wilson Caetano</strong>
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
                <Button variant="contained" className="buton-gradient">
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
