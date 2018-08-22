import validate from 'mongoose-validator';

export default validate({
  validator: 'matches',
  arguments: /^\(?[0-9]{3}\)?[-.\/\s]?[0-9]{3}[-.\/\s]?[0-9]{4}$/,
  passIfEmpty: true,
  message: 'Must be a properly formatted phone number for the United States'
});