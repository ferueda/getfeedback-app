import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import UserContext from './context/UserContext';
import useFetchUser from './hooks/useFetchUser';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SurveyNew from './components/surveys/SurveyNew';

const App = () => {
  const [user, dispatchUserFetch] = useFetchUser(null);

  return (
    <UserContext.Provider value={{ user, dispatchUserFetch }}>
      <BrowserRouter>
        <Header />
        <main className="container">
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route exact path="/surveys/new" component={SurveyNew} />
        </main>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
