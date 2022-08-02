import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER, CMT_USER_GET } from "./types";
export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get("/api/users/auth")
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function getUser(dataToSubmit1) {
  const request = axios
    .post("/api/users/getUserName", dataToSubmit1)
    .then((response) => response.data);

  return {
    type: CMT_USER_GET,
    payload: request,
  };
}
