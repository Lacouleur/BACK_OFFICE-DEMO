/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { parseJwt, getToken } from "../services/client/authclient";

const Home = () => {
  const [user] = useState(parseJwt(getToken()));
  return (
    <>
      <Header />
      <p>bonjour {user.name}</p>
      <Footer />
    </>
  );
};

export default Home;
