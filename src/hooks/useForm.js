import { useState, useEffect } from 'react';
import { toast } from '../helpers/toast';

function useForm(initialState, validate, action) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0; // return array dari object keys

      if (noErrors) {
        action();
        setValues(initialState);
        setSubmitting(false);
      } else {
        // ketika ada errors di UI, lgsg di toast
        // return array dari object values, lalu di gabung
        toast(Object.values(errors).join(' '));
        setSubmitting(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  function handleChange(e) {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit() {
    const validationErrors = validate(values);

    setErrors(validationErrors);
    setSubmitting(true);
  }

  return {
    handleChange,
    handleSubmit,
    values,
    setValues,
    isSubmitting,
  };
}

export default useForm;
