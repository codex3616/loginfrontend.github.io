import toast from "react-hot-toast";
import { authenticate } from "./helper.js";

// ############## FUNTION TO VALIDATE USERNAME #################
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  if (values.username) {
    //check username exists or not..
    const { status } = await authenticate(values.username);
    if (status !== 200) {
      errors.exists = toast.error("User does not exists...!");
    }
  }
  return errors;
}

// ############## FUNTION TO VALIDATE PASSWORD #################
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}
// ############## FUNTION TO VALIDATE REGISTER FORM #################
export async function registerValidate(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);
  return errors;
}

// ############## FUNTION TO VALIDATE PROFILE PAGE #################

export async function profileValidate(values) {
  const errors = emailVerify({}, values);
  return errors;
}

// ############## FUNTION TO VERIFY AND VALIDATE RESET PASSWORD PASSWORD #################
export async function resetPasswordValidate(values) {
  const errors = passwordVerify({}, values);
  if (values.password !== values.confirmPassword) {
    errors.exists = toast.error("Password not match...!");
  }

  return errors;
}

// ############## VERIFY PASSWORD #################

const passwordVerify = (error = {}, values) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    error.password = toast.error("Password Required...");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Invalid Password...");
  } else if (values.password.length < 4) {
    error.password = toast.error("Password should be more than 4 charcters...");
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error("Password must have special charcters...");
  }
  return error;
};

// ############## VERIFY USERNAME #################

const usernameVerify = (error = {}, values) => {
  if (!values.username) {
    error.username = toast.error("Username Required...");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username...");
  }
  return error;
};

const emailVerify = (error = {}, values) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.email) {
    error.email = toast.error("Email Required...");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email...");
  } else if (!specialChars.test(values.email)) {
    error.email = toast.error("Invalid Email...");
  }
  return error;
};
