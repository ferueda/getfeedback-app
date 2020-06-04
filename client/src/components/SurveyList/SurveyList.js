import React from 'react';
import './SurveyList.css';

const Survey = ({ title, dateSent, yes, no }) => {
  return (
    <div className="survey-card">
      <h2>{title}</h2>
      <span className="card__date">{new Date(dateSent).toLocaleDateString()}</span>
      <div>
        <span>Yes: {yes}</span>
        <span>No: {no}</span>
      </div>
    </div>
  );
};

const SurveyList = ({ surveys }) => {
  console.log(surveys);
  return (
    <div className="survey-container">
      {surveys.reverse().map(({ _id, title, dateSent, yes, no }) => (
        <Survey key={_id} title={title} dateSent={dateSent} yes={yes} no={no} />
      ))}
    </div>
  );
};

export default SurveyList;
