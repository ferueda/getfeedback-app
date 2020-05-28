import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import UserContext from './context/UserContext';
import useFetchUser from './hooks/useFetchUser';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import PaymentModal from './components/PaymentModal/PaymentModal';

const Dashboard = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  return (
    <div>
      <h2 className="text-center">Dashboard</h2>
      <button onClick={() => setModalIsVisible(true)} className="btn btn--active">
        Add Credits
      </button>
      {modalIsVisible && <PaymentModal isVisible={modalIsVisible} setIsVisible={setModalIsVisible} />}
    </div>
  );
};
const SurveyNew = () => <h2>SurveyNew</h2>;

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
