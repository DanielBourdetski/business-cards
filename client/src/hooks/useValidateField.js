import { useState } from 'react';
import validations from '../Validation/validation';

const acceptedTypes = ['Signup', 'Login', 'Card'];

/**
 * validates one field of a form for real-time feedback on field validation
 * @param {string} validationType 'Signup' | 'Login' | 'Card' - string that matches the different validation functions
 * @param {object} currentErrorState the current, errorful error state. if there are currently no errors, you should not use the callback function provided by the hook
 * @param {fn} setErrorState the setState function for the error state
 * @returns callback function that updates the state in regard to the errors on the chosen field
 */
const useValidateOne = (validationType, currentErrorState, setErrorState) => {
  const [dirtyFields, setDirtyFields] = useState([]);
  const getValidation = (values) => validations['validate' + validationType](values);

  if (!validationType || !acceptedTypes.includes(validationType)) throw new Error('invalid type');

  return (values, field, eventType) => {    
    const updatedErrorState = {...currentErrorState};

    // if field has err, add to dirty fields
    // for validation, used for when submitting without touching fields
    const updatedDirtyFields = [...dirtyFields]

    Object.keys(updatedErrorState).map(key => {
      if (updatedErrorState[key] !== '' && !dirtyFields.includes(key)) updatedDirtyFields.push(key)
    });

    setDirtyFields(updatedDirtyFields)

    const validateOne = (fieldToValidate) => {
      const validation = getValidation(values);
      const chosenFieldError = validation.error?.details.find(err => err.path.includes(fieldToValidate))
      
      if (chosenFieldError) updatedErrorState[fieldToValidate] = chosenFieldError.message;
      else updatedErrorState[fieldToValidate] = '';
    }

    if (eventType === 'blur') {
      if (values[field].trim() === '') return;

      validateOne(field);
      if (!dirtyFields.includes(field)) setDirtyFields([...dirtyFields, field]);
      return setErrorState(updatedErrorState)
    }
    
    if (!dirtyFields.includes(field)) return;
    
    validateOne(field);
    setErrorState(updatedErrorState);
  }
};

export default useValidateOne