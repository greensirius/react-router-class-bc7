export function setToken(username, password) {
  if (username === 'admin' && password === 'admin') {
    localStorage.setItem('token', 'admin');
    alert('user logged-in');
    return true;
  } else localStorage.setItem('token', null);
  alert('username/password invalid');
  return false;
}

export function getToken() {
  return localStorage.getItem('token');
}

export function removeToken() {
  localStorage.setItem('token', null);
}
