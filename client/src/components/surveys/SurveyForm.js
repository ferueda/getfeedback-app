import React, { useContext } from 'react';
import SurveyContext from '../../context/UserContext';
import useForm from '../../hooks/useForm';

const Field = ({ label, component = 'input', type = 'text', name, placeholder, value, onChange }) => {
  if (component === 'input') {
    return (
      <div className="form-field">
        <label htmlFor={name}>{label}</label>
        <input type={type} id={name} name={name} placeholder={placeholder} value={value} onChange={onChange} />
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
    <div>
      <form onSubmit={handleSubmit}>
        <Field label="Survey Title" name="title" value={title} onChange={handleChange} />
        <Field label="Subject Line" name="subject" value={subject} onChange={handleChange} />
        <Field label="Email Body" name="body" value={body} onChange={handleChange} />
        <Field label="Recipient List" name="recipients" value={recipients} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SurveyForm;
