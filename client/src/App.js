import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import UserContext from './context/UserContext';
import useFetchUser from './hooks/useFetchUser';
import Header from './components/Header';
import Landing from './components/Landing';
import Payments from './components/Payments';

const Dashboard = () => <Payments />;
const SurveyNew = () => <h2>SurveyNew</h2>;

const App = () => {
  const [user, dispatchUserFetch] = useFetchUser(null);

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Header />
        <main className="container max-w-screen-lg mx-auto">
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route exact path="/surveys/new" component={SurveyNew} />
        </main>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
