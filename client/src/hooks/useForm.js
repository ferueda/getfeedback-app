import { useState, useEffect } from 'react';

const validateEmails = (emails) => {
  const invalidEmails = emails
    .split(',')
    .map((email) => email.trim())
    .filter((email) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email));

  if (invalidEmails.length) {
    return true;
  } else return false;
};

const validate = (values) => {
  const errors = {};

  // Title Validation
  if (!values.title) {
    errors.title = 'Required Title';
  }

  // Subect Line Validation
  if (!values.subject) {
    errors.subject = 'Required Subject Line';
  }

  // Email Body Validation
  if (!values.body) {
    errors.body = 'Required Email Body';
  }

  // Recipients (Email) Validation
  if (!values.recipients) {
    errors.recipients = 'Required Recipients List';
  } else if (validateEmails(values.recipients)) {
    errors.recipients = 'Invalid email address';
  }

  return errors;
};

const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        // Submitting the form here
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors, isSubmitting]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    isSubmitting,
  };
};

export default useForm;
