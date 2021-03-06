import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import NewAlbum from "./pages/newAlbum/NewAlbum";
import EditAlbum from "./pages/editAlbum/EditAlbum";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/homePage" component={HomePage}></Route>

      <Route path="/newAlbum" component={NewAlbum}></Route>
      <Route path="/editAlbum" component={EditAlbum}></Route>

      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>

      <Redirect to="/homePage" />
    </Switch>
  </BrowserRouter>
);

export default Routes;
