export default function validateEditProfile(values) {
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

  // current password errors
  if (!values.currentPassword) {
    errors.currentPassword = 'Current Password is required';
  } else if (values.currentPassword.length < 6) {
    errors.currentPassword = 'Enter a minimum 6 characters';
  }

  // new password errors
  if (values.newPassword.length < 6) {
    errors.newPassword = 'Enter a minimum 6 characters';
  }

  return errors;
}
