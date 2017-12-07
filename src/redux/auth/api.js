import { post } from '../../utils/fetch';
import { API_URL } from '../config';

export function login(queryParams) {
  return post(`${API_URL}/applogin/login`, { query: queryParams });
}

export function loginPin(queryParams) {
  return post(`${API_URL}/applogin/loginpin`, { query: queryParams });
}

export function resetPassword(queryParams) {
  return post(`${API_URL}/applogin/passwordreset`, { query: queryParams });
}
