import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UpdateGoals from './components/UpdateGoals';
import Suggestions from './components/Suggestions';
import Reports from './components/Reports';
import FinancialDashboard from './components/FinancialDashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/update-goals" component={UpdateGoals} />
        <Route path="/suggestions" component={Suggestions} />
        <Route path="/reports" component={Reports} />
        <Route path="/" component={FinancialDashboard} />
      </Switch>
    </Router>
  );
}

export default App;