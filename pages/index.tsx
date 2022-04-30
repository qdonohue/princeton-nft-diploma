import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Metamask from "../components/crypto/Metamask";
import Landing from "../components/landing/landing";

const Home: NextPage = () => {
  return (
    <div>
      <Landing />
    </div>
  );
};

export default Home;
