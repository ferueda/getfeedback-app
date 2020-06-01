import React, { useContext } from 'react';
import SurveyContext from '../../context/UserContext';

const Field = ({ type, name, placeholder, component }) => {
  if (component === 'input') {
    return <input type={type} name={name} placeholder={placeholder} />;
  }

  return;
};

const SurveyForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
  };

  const {} = useContext(SurveyContext);
  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input type="text" name="surveyTitle" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SurveyForm;
