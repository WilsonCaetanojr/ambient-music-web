import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import NewAlbum from "./pages/newAlbum/NewAlbum";
import EditAlbum from "./pages/editAlbum/EditAlbum";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import MyAccount from "./pages/myAccount/MyAccount";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/homePage" component={HomePage} />

      <Route path="/newAlbum" component={NewAlbum} />
      <Route path="/editAlbum" component={EditAlbum} />

      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      <Route path="/myAccount" component={MyAccount} />

      <Redirect to="/homePage" />
    </Switch>
  </BrowserRouter>
);

export default Routes;
