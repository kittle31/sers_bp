import React from "react"
import {HashRouter, Route, Switch} from 'react-router-dom'
import "../css/App.css"

import HomePage from "./components/HomePage"
import AuthPage from './components/AuthPage'
import ResidentPage from './components/ResidentPage'
import ResidentEditor from './components/ResidentEditor'
import AccountabilityPage from './components/AccountabilityPage'
import RemindersPage from './components/RemindersPage'

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
                    <Route exact path="/accountability" component={AccountabilityPage} />
                    <Route exact path="/reminders" component={RemindersPage} />

                  </Switch>
                </div>
            </HashRouter>
        </div>
    );
  }
}

export default App
