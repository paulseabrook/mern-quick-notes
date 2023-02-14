// this will handle user-related communications with the server

import sendRequest from './send-request';
// This is the base path of the Express route we'll define
const BASE_URL = '/api/users';

export async function signUp(userData) {
  // // Fetch uses an options object as a second arg to make requests
  // // other than basic GET requests, include data, headers, etc.
  // const res = await fetch(BASE_URL, {
  //   // Will use POST method for creating a user.
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   // Fetch requires data payloads to be stringified
  //   // and assigned to a body property on the options object
  //   body: JSON.stringify(userData),
  // });
  // // Check if request was successful
  // if (res.ok) {
  //   // res.json() will resolve to the JWT
  //   return res.json();
  // } else {
  //   throw new Error('Invalid Sign Up');
  // }
  return sendRequest(BASE_URL, 'POST', userData);
}

export async function logIn(credentials) {
  // // Fetch uses an options object as a second arg to make requests
  // // other than basic GET requests, include data, headers, etc.
  // const res = await fetch(BASE_URL + '/login', {
  //   // Will use POST method for logging a user in
  //   method: 'POST',
  //   // NEED headers for POST
  //   headers: { 'Content-Type': 'application/json' },
  //   // Fetch requires data payloads to be stringified
  //   // and assigned to a body property on the options object
  //   body: JSON.stringify(credentials),
  // });
  // // Check if request was successful
  // if (res.ok) {
  //   // res.json() will resolve to the JWT
  //   return res.json();
  // } else {
  //   throw new Error('Invalid Sign Up');
  // }
  return sendRequest(BASE_URL + '/login', 'POST', credentials);
}

// trying to check validity and expiration of token
export async function checkToken() {
  return sendRequest(BASE_URL + '/check-token');
}
