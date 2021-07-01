import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RestoInfo from "../pages/RestoInfo";
import LoginPage from "../pages/LoginPage";
import ManageResto from "../restoAction/ManageResto";
import AddResto from "../restoAction/AddResto";
import EditResto from "../restoAction/EditResto";
import NotFoundPage from '../pages/NotFoundPage';

const Routes = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/manageResto" component={ManageResto} />
          <Route path="/resto/add" component={AddResto} />
          <Route path="/resto/edit/:id" component={EditResto} />
          <Route path="/resto/:id" component={RestoInfo} />
          <Route component={NotFoundPage}/>
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
