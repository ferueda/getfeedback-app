import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import UserContext from './context/UserContext';
import useFetchUser from './hooks/useFetchUser';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import PaymentModal from './components/PaymentModal/PaymentModal';

const Dashboard = () => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <div>
      <h2 className="text-center mt-4 text-3xl">Dashboard</h2>
      <button onClick={() => setModalActive(true)}>Add Credits</button>
      {modalActive && <PaymentModal />}
    </div>
  );
};
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
