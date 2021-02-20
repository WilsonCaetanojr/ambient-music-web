import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/homePage/homePage";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/homepage" component={HomePage}></Route>
      <Redirect to="/homepage" />
    </Switch>
  </BrowserRouter>
);

export default Routes;
