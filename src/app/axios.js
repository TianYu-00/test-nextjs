import axios from "axios";

//https://fakerapi.it/en
const api = axios.create({
  baseURL: "https://fakerapi.it/api/v1",
});

export const fetchRandomUser = () => {
  return api
    .get("/users?_quantity=1")
    .then((response) => {
      // console.log(response.data.data[0]);
      return response.data.data[0];
    })
    .catch((error) => {
      throw error;
    });
};

export const fetchRandomAvatar = (username) => {
  return axios
    .get(`https://api.dicebear.com/9.x/pixel-art/svg?seed=${username}`)
    .then((response) => {
      // console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
