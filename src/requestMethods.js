import axios from "axios";

//Heroku : https://bookshop-mern-tj.herokuapp.com/api/
//Local : http://localhost:5000/api/
const BASE_URL = "https://bookshop-mern-tj.herokuapp.com/api/";

const user = JSON.parse(localStorage.getItem("persist:root"))
  ? JSON.parse(localStorage.getItem("persist:root")).user
  : null;
const currentUser = user && JSON.parse(user).currentUser;
export const TOKEN = currentUser ? currentUser.accessToken : null;
console.log(TOKEN, "TTTTTTTTTT");

//const user = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user);
//const currentUser = user && user.currentUser;
//const TOKEN = currentUser ? currentUser.accessToken : null;
//console.log(user);

//const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
//const currentUser = user && JSON.parse(user).currentUser;
//const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
