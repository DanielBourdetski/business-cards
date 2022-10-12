# form validation rules
    validate on field blur
    validate on change while user is correcting an invalid field (if field is already displaying error)

    if user is filing the field for the first time (a clean field), do not validate and do not display error
    if user has left a clean field empty, do not validate and do not display error

    on submit, validate all field regardless of field and error states