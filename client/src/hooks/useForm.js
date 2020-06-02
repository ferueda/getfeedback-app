import React, { useState, useEffect } from 'react';

const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, seterrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    console.log(event.target);
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
