import { useState } from 'react';

interface UseForm {
  initialValues: { [index: string]: any };
  onSubmit(): any;
}

export const useForm = ({ initialValues, onSubmit }: UseForm) => {
  const [values, setValues] = useState(initialValues);

  const handleSubmit = (event: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    onSubmit();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      event.persist();
      setValues(values => ({
        ...values,
        [event.target.name]: event.target.value,
      }));
    }
  };

  return {
    handleInputChange,
    handleSubmit,
    values,
  };
};
