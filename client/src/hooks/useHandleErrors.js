import { useState } from 'react';
import { toast } from 'react-toastify';
import { toastConfig } from '../lib/config';

const useHandleErrors = (cleanErrorState, setErrorState) => {
  const [recentlySubmitted, setRecentlySubmitted] = useState(false);

  const handleErrors = validation => {
    // prevents overrendering toasts when spamming submit button
    if (recentlySubmitted) return;

    setRecentlySubmitted(true);
    setTimeout(() => setRecentlySubmitted(false), 2000);

    console.log(validation);

    const errors = validation.error.details.reduce((errors, err) => {
      // no need to display 2 errors for the same input
      if (errors[err.context.key]) return errors;

      errors[err.context.key] = err.message;
      toast.error(err.message, toastConfig);

      return errors;
    }, {});

    console.log(errors);

    setErrorState({ ...cleanErrorState, ...errors });
  };

  return handleErrors;
};

export default useHandleErrors;
