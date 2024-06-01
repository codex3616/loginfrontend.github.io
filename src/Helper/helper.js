import axios from "axios";
import jwtDecode from "jwt-decode";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// ################## making all API requests ######################

// to get username from the token
export async function getUsername() {
  const token = await localStorage.getItem("token");
  if (!token) Promise.reject("Cannot find token");
  let decode = jwtDecode(token);
  return decode.username;
}

// authenticate function...
export async function authenticate(username) {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "Username doesn't exists.." };
  }
}

// get user details...
export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't Match..." };
  }
}

// register user function...
export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`/api/register`, credentials);

    let { username, email } = credentials;

    // sending email when user get register successfully...
    if (status === 201) {
      await axios.post("/api/registermail", {
        username,
        userEmail: email,
        text: msg,
      });
    }
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

// login function...
export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data, status } = await axios.post("/api/login", {
        username,
        password,
      });
      return { data, status };
    }
  } catch (error) {
    return { error: error };
  }
}

// update profile function...
export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put("/api/updateuser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data };
  } catch (error) {
    return { error: "Couldn't Update Profile..." };
  }
}

// generate otp...and send that otp using mail....
export async function generateOTP({ username }) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", { params: { username } });

    //send mail if otp is successfully generated...

    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });

      let text = `Your Password recovery OTP is ${code}. Verify and recover your password.`;
      await axios.post("/api/registermail", {
        username,
        userEmail: email,
        text,
        subject: "Passsword Recovery OTP",
      });
    }
    return code;
  } catch (error) {
    return { error };
  }
}

// verify OTP...
export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await axios.get("/api/verifyOTP", {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return { error };
  }
}

// reset password...
export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put("/api/resetpassword", {
      username,
      password,
    });
    return { data, status };
  } catch (error) {
    return { error };
  }
}
