
import axios from "axios";

const API_BASE_URL = "http://localhost:3001/incidents";

function getAll() {
  return axios
    .get(API_BASE_URL)
    .then((response) => response.data);
}

function create(newIncident) {
  return axios
    .post(API_BASE_URL, newIncident)
    .then((response) => response.data);
}

function updateStatus(id, status) {
  return axios
    .patch(`${API_BASE_URL}/${id}`, { status })
    .then((response) => response.data);
}


function remove(id) {
  return axios.delete(`${API_BASE_URL}/${id}`);
}

export default {
  getAll,
  create,
  updateStatus,
  remove,
};
