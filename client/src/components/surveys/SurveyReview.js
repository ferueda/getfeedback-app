import React, { useContext } from 'react';
import SurveyContext from '../../context/UserContext';
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

const SurveyReview = ({ setShowReview }) => {
  const survey = useContext(SurveyContext);
  const { title, subject, body, recipients } = survey.values;

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
        <button type="submit" className="btn btn--active survey__btn">
          Send
        </button>
      </div>
    </div>
  );
};

export default SurveyReview;
