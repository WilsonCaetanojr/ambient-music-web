import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import NewAlbum from "./pages/newAlbum/NewAlbum";
import EditAlbum from "./pages/editAlbum/EditAlbum";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/homepage" component={HomePage}></Route>
      <Route path="/newAlbum" component={NewAlbum}></Route>
      <Route path="/editAlbum" component={EditAlbum}></Route>
      <Redirect to="/homepage" />
    </Switch>
  </BrowserRouter>
);

export default Routes;
