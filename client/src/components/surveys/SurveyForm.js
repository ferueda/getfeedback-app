import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SurveyContext from '../../context/UserContext';
import useForm from '../../hooks/useForm';
import './SurveyForm.css';

const Field = ({ label, component = 'input', type = 'text', name, placeholder, value, onChange }) => {
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
          className="form-field__input"
        />
      </div>
    );
  }

  return null;
};

const SurveyForm = () => {
  const { handleSubmit, handleChange, values } = useForm({ title: '', subject: '', body: '', recipients: '' });
  const { title, subject, body, recipients } = values;

  const {} = useContext(SurveyContext);

  return (
    <div className="form-container">
      <h2 className="form-title">New Survey</h2>
      <form onSubmit={handleSubmit}>
        <Field label="Survey Title" name="title" value={title} onChange={handleChange} />
        <Field label="Subject Line" name="subject" value={subject} onChange={handleChange} />
        <Field label="Email Body" name="body" value={body} onChange={handleChange} />
        <Field label="Recipient List" name="recipients" value={recipients} onChange={handleChange} />
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
