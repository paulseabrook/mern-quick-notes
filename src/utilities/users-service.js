// this module will be used to organize functions used to sign-up, log in, log out, etc.

// Import all named exports attached to a usersAPI object
// This syntax can be helpful documenting where the methods come from
import * as usersAPI from './users-api';

export async function signUp(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  // Baby step by returning whatever is sent back by the server
  // Persist the "token"
  // We want to save it in localStorage
  localStorage.setItem('token', token);
  // this is how we return the user so that the state is updated and pages are switched
  return getUser();
}

export function getToken() {
  // get the token from local storage
  const token = localStorage.getItem('token');

  if (!token) return null;
  // get the token's payload ( we can do this with split method)
  // the second index of an array is the [1].  This is the payload
  const payload = token.split('.')[1];

  // check if the token has expired
  // note: JWTs are base64 encoded, we need to decode to make it usable
  // JS has a built-in function for decoding base64, called atob()
  // atob() takes the token as an argument and returns JSON containing things like user, name, email, id, etc.
  // atob() will say depricated, but that is only relevent if using in backend, we are okay here on the frontend
  const decodedPayload = atob(payload);
  // change to POJO
  const parsedPayload = JSON.parse(decodedPayload);

  // JWT's expiration date is expressed in seconds, not milliseonds, so we must convert
  // if the parsedPayload expiration is less than the current time divided by 1000, remove the token and return null
  if (parsedPayload.exp < Date.now() / 1000) {
    localStorage.removeItem('token');
    return null;
  } else {
    return token;
  }
}

export function getUser() {
  // invoke the function we created above, getting the token
  const token = getToken();

  // If there's a token, return the user in the payload, otherwise return null

  if (token) {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const parsedPayload = JSON.parse(decodedPayload);
    return parsedPayload.user;
  } else {
    return null;
  }
}

export function logOut() {
  localStorage.removeItem('token');
}

export async function logIn(credentials) {
  const token = await usersAPI.logIn(credentials);
  localStorage.setItem('token', token);
  return getUser();
}

export function checkToken() {
  return usersAPI.checkToken().then((dateStr) => new Date(dateStr));
}
