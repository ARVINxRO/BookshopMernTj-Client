import React from "react";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import { useSelector } from "react-redux";
import {TOKEN} from '../requestMethods'

const Home = () => {
  const user = useSelector((state) => state.user);
  //console.log(user);
  if (!TOKEN && user.currentUser) {
    window.location.reload();
  }
  return (
    <div>
      <Navbar />
      <Products />
    </div>
  );
};

export default Home;
