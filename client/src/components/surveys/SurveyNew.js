import React, { useReducer } from 'react';
import SurveyForm from './SurveyForm';
import reducers from '../../context/reducers';
import SurveyContext from '../../context/UserContext';
import useForm from '../../hooks/useForm';

const SurveyNew = () => {
  return (
    <SurveyContext.Provider value="">
      <SurveyForm />
    </SurveyContext.Provider>
  );
};

export default SurveyNew;
