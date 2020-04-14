// SET or DELETE token from Authorization header
import axios from 'axios';


export default function setAuthToken(token) {
  // token will be attached on Authorization header for every axios request
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  // token will be deleted from Authorization header, meaning user is logged out
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
};