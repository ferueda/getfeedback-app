import React, { useState } from 'react';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';
import SurveyContext from '../../context/UserContext';
import useForm from '../../hooks/useForm';

const SurveyNew = () => {
  const [showReview, setShowReview] = useState(true);

  const survey = useForm({
    title: 'My first Survey',
    subject: 'With your feedback, we become better',
    body: 'Please help us improve giving us your sincere feedback',
    recipients: 'fe.rueda@hotmail.com, fe.ruedaluque@gmail.com, fe.rueda@outlook.com',
  });

  return (
    <SurveyContext.Provider value={survey}>
      {showReview ? <SurveyReview setShowReview={setShowReview} /> : <SurveyForm setShowReview={setShowReview} />}
    </SurveyContext.Provider>
  );
};

export default SurveyNew;
