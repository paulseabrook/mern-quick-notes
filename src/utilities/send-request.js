import { getToken } from './users-service.js';

export default async function sendRequest(url, method = 'GET', payload = null) {
  const options = { method };
  // if payload, set headers, body
  if (payload) {
    options.headers = {
      'Content-Type': 'application/json',
    };
    options.body = JSON.stringify(payload);
  }

  // if there is a token, include it in the request
  const token = getToken();
  if (token) {
    // make sure we have headers on our options
    options.headers = options.headers || {};
    // add in our token with an Authorization header
    // make sure to capitalize Authorization
    options.headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, options);
  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    return res.json();
  } else {
    throw new Error('Invalid Sign Up');
  }
}
