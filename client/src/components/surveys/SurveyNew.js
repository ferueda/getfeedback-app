import React, { useState } from 'react';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';
// import reducers from '../../context/reducers';
import SurveyContext from '../../context/UserContext';
import useForm from '../../hooks/useForm';

const SurveyNew = () => {
  const [showReview, setShowReview] = useState(false);

  const survey = useForm({
    title: '',
    subject: '',
    body: '',
    recipients: '',
  });

  return (
    <SurveyContext.Provider value={survey}>
      {showReview ? <SurveyReview /> : <SurveyForm setShowReview={setShowReview} />}
    </SurveyContext.Provider>
  );
};

export default SurveyNew;
