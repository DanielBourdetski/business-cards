import httpService from './httpService';
import jwtDecode from 'jwt-decode';

function setTokenHeader() {
  httpService.setAuthToken(getJWT());
}

export function register(user) {
  return httpService.post(`/users/register`, user);
}

export async function login(credentials) {
  const { data } = await httpService.post(`/users/signin`, credentials);

  localStorage.setItem('TOKEN_KEY', data.token);
  setTokenHeader();

  return data;
}

export function getJWT() {
  return localStorage.getItem('TOKEN_KEY');
}

export function logout() {
  localStorage.removeItem('TOKEN_KEY');
  setTokenHeader();
}

export function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

const userService = {
  register,
  login,
  getJWT,
  logout,
  getUser,
};

export default userService;
