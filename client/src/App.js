import './App.css'
//import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import SignupPage from "./pages/SignupPage/SignupPage"
import SigninPage from './pages/SigninPage/SigninPage'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import SetReminderPage from './pages/SetReminderPage/SetReminderPage'
import NotFound from './pages/404/404'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

export default function App() {
    return (
      <Router>
          <Switch>
              <Route exact path="/" component={DashboardPage}/>
              <Route exact path="/set-reminder" component={SetReminderPage}/>
              <Route exact path="/signin" component={SigninPage}/>
              <Route exact path="/signup" component={SignupPage}/>
              <Route path="*" component={NotFound}/>
          </Switch>
      </Router>
    );
}
