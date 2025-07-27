import { checkResponse } from "./api";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwrnow.jumpingcrab.com"
    : "http://localhost:3001";

export function register(name, email, password, avatar) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, avatar }),
  }).then(checkResponse);
}

export function authorize(email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export const getCurrentUser = (token) =>
  fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject("Invalid token")));
