import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import NewAlbum from "./pages/tableAlbum/NewAlbum";
import EditAlbum from "./pages/tableAlbum/EditAlbum";
import NewMusic from "./pages/tableMusic/NewMusic";
import EditMusic from "./pages/tableMusic/EditMusic";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import MyAccount from "./pages/myAccount/MyAccount";
import Authentication from "./middlewares/Authentication";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Authentication path="/homePage" component={HomePage} />

      <Authentication path="/newAlbum" component={NewAlbum} />
      <Authentication path="/editAlbum" component={EditAlbum} />

      <Authentication path="/newMusic" component={NewMusic} />
      <Authentication path="/editMusic" component={EditMusic} />

      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      <Authentication path="/myAccount" component={MyAccount} />

      <Route path="/" component={Login} />

      <Redirect to="/login" />
    </Switch>
  </BrowserRouter>
);

export default Routes;
