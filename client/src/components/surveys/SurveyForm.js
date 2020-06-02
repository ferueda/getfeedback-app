import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import SurveyContext from '../../context/UserContext';
import useForm from '../../hooks/useForm';
import './SurveyForm.css';

const Field = ({ label, component = 'input', type = 'text', onBlur, name, placeholder, value, onChange, error }) => {
  if (component === 'input') {
    return (
      <div className="form-field">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={error ? 'form-field__input error' : 'form-field__input'}
        />
      </div>
    );
  }

  return null;
};

const SurveyForm = () => {
  const { handleSubmit, handleChange, values, errors } = useForm({
    title: '',
    subject: '',
    body: '',
    recipients: '',
  });

  const { title, subject, body, recipients } = values;

  const {} = useContext(SurveyContext);

  return (
    <div className="form-container">
      <h2 className="form-title">New Survey</h2>
      <form onSubmit={handleSubmit}>
        <Field label="Survey Title" name="title" value={title} onChange={handleChange} error={errors.title} />
        <Field label="Subject Line" name="subject" value={subject} onChange={handleChange} error={errors.subject} />
        <Field label="Email Body" name="body" value={body} onChange={handleChange} error={errors.body} />
        <Field
          label="Recipient List"
          name="recipients"
          value={recipients}
          onChange={handleChange}
          error={errors.recipients}
        />
        <div className="survey-btn-container">
          <Link to="/surveys" className="btn survey-cancel">
            Cancel
          </Link>

          <button type="submit" className="btn btn--active survey__btn">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SurveyForm;
