export default function validateSignup(values) {
  let errors = {};

  // name errors
  if (!values.name) {
    errors.name = 'Username is required';
  }

  // email errors
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Enter a valid email address';
  }

  // password errors
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Enter a minimum 6 characters';
  }

  return errors;
}
