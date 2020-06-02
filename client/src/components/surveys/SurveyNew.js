import React, { useState } from 'react';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';
import SurveyContext from '../../context/SurveyContext';
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
      {showReview ? <SurveyReview setShowReview={setShowReview} /> : <SurveyForm setShowReview={setShowReview} />}
    </SurveyContext.Provider>
  );
};

export default SurveyNew;
