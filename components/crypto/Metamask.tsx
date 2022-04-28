import { useMetaMask } from "metamask-react";

import Blockies from "react-blockies";

import { BounceLoader, GridLoader } from "react-spinners";

const containerStyling =
  "min-h-min min-w-min mx-auto my-auto border border-slate-400 shadow-sm p-5 rounded-lg ";

const imageStyling = "h-64 w-64";

const StatusLabel = ({ text }: { text: string }) => (
  <div className="font-light text-center text-xl">{text}</div>
);

const Metamask = () => {
  const { status, connect, account } = useMetaMask();

  if (status === "unavailable") {
    return (
      <div
        className={
          containerStyling + " flex flex-col justify-center items-center"
        }
      >
        <StatusLabel text={"Metamask doesn't appear to be installed"} />
        <img
          src="./sad-tiger.jpg"
          className={imageStyling + " rounded-xl + py-2"}
        />
        <div className="w-64 text-center text-sm">
          We use Metamask to connect your ethereum wallet to our servers. Please
          install the{" "}
          <a
            className="text-blue-600"
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
          >
            Metamask extension
          </a>{" "}
          to recieve your diploma.
        </div>
      </div>
    );
  }

  if (status === "notConnected") {
    return (
      <div>
        <div
          className={containerStyling + "cursor-pointer hover:bg-slate-200"}
          onClick={connect}
        >
          <img src="./Metamask.png" className={imageStyling} />
          <div className="font-light text-center text-xl">Connect Metamask</div>
        </div>
      </div>
    );
  }

  if (status === "initializing" || status === "connecting") {
    <div className={containerStyling + "flex flex-col text-center"}>
      <GridLoader size="10vh" color="#485ed1" />
      <StatusLabel text={"Waiting on Metamask"} />
    </div>;
  }

  return (
    <div
      className={
        containerStyling + " flex flex-col justify-center items-center"
      }
    >
      <StatusLabel text={`Succesfully connected wallet!`} />
      <div className="shadow-lg pt-2">
        {account && <Blockies seed={account} size={48} />}
      </div>
      <div className="text-sm font-light">
        {account ? account?.substring(0, 14) + "..." : ""}
      </div>
    </div>
  );
};

export default Metamask;
