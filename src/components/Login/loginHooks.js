import { useState } from 'react';

export function useLoginForm(initialState) {
  const [formData, setFormData] = useState(initialState);

  function handleChange(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  return { formData, handleChange };
}
