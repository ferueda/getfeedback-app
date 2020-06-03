import React, { useContext } from 'react';
import { withRouter } from 'react-router';
import SurveyContext from '../../context/SurveyContext';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import './SurveyReview.css';

const ReviewField = ({ label, name, value }) => {
  return (
    <div className="form-field review-field-container">
      <label htmlFor={name}>{label}</label>
      <div className="review-content" id={name}>
        {value}
      </div>
    </div>
  );
};

const SurveyReview = ({ setShowReview, history }) => {
  const survey = useContext(SurveyContext);
  const { dispatchUserFetch } = useContext(UserContext);

  const { title, subject, body, recipients } = survey.values;

  const handleSubmit = async (surveyObject, history) => {
    const res = await axios.post('/api/surveys', surveyObject);

    survey.setValues({
      title: '',
      subject: '',
      body: '',
      recipients: '',
    });

    setShowReview(false);
    history.push('/surveys');

    dispatchUserFetch({
      type: 'FETCH_USER',
      payload: res.data,
    });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Review Survey</h2>
      <div className="review-info-container">
        <ReviewField label="Survey Title" name="title" value={title} />
        <ReviewField label="Subject Line" name="subject" value={subject} />
        <ReviewField label="Email Body" name="body" value={body} />
        <ReviewField label="Recipient List" name="recipients" value={recipients} />
      </div>
      <div className="survey-btn-container">
        <button onClick={() => setShowReview(false)} className="btn survey-goback">
          Go Back
        </button>
        <button
          onClick={() => handleSubmit(survey.values, history)}
          type="submit"
          className="btn btn--active survey__btn"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default withRouter(SurveyReview);
