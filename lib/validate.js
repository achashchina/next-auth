export function register_validate({ email, password, cpassword }) {
  const errors = {};

  if (!email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }

  // validation for password
  if (!password) {
    errors.password = 'Required';
  } else if (password.length < 3 || password.length > 20) {
    errors.password = 'Must be greater then 3 and less then 20 characters long';
  } else if (password.includes(' ')) {
    errors.password = 'Invalid Password';
  }

  if (password !== cpassword) {
    errors.cpassword = 'Passwords should be equals...';
  }

  return errors;
}

export function new_customer_validate({ firstName, lastName, companyName, email }) {
  const errors = {};

  if (!companyName && !(firstName || lastName)) {
    errors.name = 'Company name or first name or last name are required!';
  } 

   if (companyName && companyName.trim().length < 3) {
    errors.name = 'Company name too short!';
  } 
   if (firstName && firstName.trim().length < 3) {
    errors.name = 'First name to short!';
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
}
