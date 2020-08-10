export default function validateCreateLink(values) {
  let errors = {};

  const expression = /^http:\/\/|https:\/\/?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  const regex = new RegExp(expression);
  if (!values.url) {
    errors.url = 'URL is required.';
  } else if (!regex.test(values.url)) {
    errors.url = 'Use http:// or https:// at the starting URL.';
  }

  // Description Errors
  if (!values.description) {
    errors.description = 'Description is required.';
  } else if (values.description.length < 10) {
    errors.description = 'The description must be at least 10 characters.';
  }

  // URL Errors
  // if (!values.url) {
  //   errors.url = 'URL is required.';
  // } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
  //   errors.url = 'Use http:// or https:// at the starting URL.';
  // }

  return errors;
}
