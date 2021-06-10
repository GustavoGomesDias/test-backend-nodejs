function validationField(field) {
  return field === '' || field === ' ' || field === undefined;
}

export default {
  validationField,
};
