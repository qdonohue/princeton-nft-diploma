import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Metamask from "../components/crypto/Metamask";
import Landing from "../components/landing/landing";

const Home: NextPage = () => (
  <div className="bg-independence h-screen grid place-items-center">
    <div className="grid place-items-center">
      <div className="text-center text-white text-6xl font-family: ui-sans-serif">
        Your Princeton Diploma.
      </div>
      <div className="text-center text-white text-3xl font-family: ui-sans-serif m-10">
        Permanent and Immutable.
      </div>
      <div>
        <Landing />
      </div>
    </div>
  </div>
);

export default Home;
