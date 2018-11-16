import React from "react"
import {HashRouter, Route, Switch} from 'react-router-dom'
import "../css/App.css"

import HomePage from "./pages/HomePage"
import AuthPage from './pages/AuthPage'
import ResidentPage from './pages/ResidentPage'
import ResidentEditor from './pages/ResidentEditor'
import AccountabilityPage from './pages/AccountabilityPage'
import RemindersPage from './pages/RemindersPage'
import DailyHappenings from "./pages/DailyHappenings"

class App extends React.Component {
  render() {
    const { alert } = this.props;
    return (
      <div style={{width: '100%'}}>
        <HashRouter>
          <div>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={AuthPage} />
              <Route exact path="/residents" component={ResidentPage} />
              <Route exact path="/residents/edit" component={ResidentEditor} />
              <Route exact path="/residents/new" component={ResidentEditor} />
              <Route exact path="/accountability" component={AccountabilityPage} />
              <Route exact path="/reminders" component={RemindersPage} />
              <Route exact path="/accountability/happenings" component={DailyHappenings}/>
            </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App
