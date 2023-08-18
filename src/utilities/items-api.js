import sendRequest from './send-request';

const BASE_URL = '/api/items';

export function getAll() {
  return sendRequest(BASE_URL);
}

export function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export function addComment(id, payload) {
  return sendRequest(`${BASE_URL}/${id}/addcomment`, 'POST', payload)
}