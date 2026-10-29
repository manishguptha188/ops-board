
import axios from "axios";

const API_BASE_URL = "http://localhost:3001/incidents";

function getAll() {
  return axios
    .get(API_BASE_URL)
    .then((response) => response.data);
}

export default {
  getAll,
};
