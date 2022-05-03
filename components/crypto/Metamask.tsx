import { useMetaMask } from "metamask-react";

import Blockies from "react-blockies";

import { GridLoader } from "react-spinners";

import Image from "next/image";

const imageStyling = "w-64 h-64";

const containerStyling =
  "h-4/5 w-full mx-auto my-auto p-5 flex flex-col items-center";

const StatusLabel = ({
  text,
  complete,
}: {
  text: string;
  complete?: boolean;
}) => (
  <div>
    <div className="font-light text-white text-center text-5xl font-family: ui-sans-serif grid place-items-center mb-5">
      {text}
    </div>
    {complete && (
      <div className="text-white text-center text-lg font-family: ui-sans-serif mb-3">
        Great job!
      </div>
    )}
  </div>
);

const Metamask = ({ advance }: { advance: (arg0: string) => void }) => {
  const { status, connect, account } = useMetaMask();

  if (status === "unavailable") {
    return (
      <div className={containerStyling}>
        <StatusLabel text={"Metamask doesn't appear to be installed"} />
        <Image
          src={"/sad-tiger.jpg"}
          className={imageStyling + " rounded-xl + py-4"}
          height={512}
          width={512}
        />
        <div className="w-96 mt-2 text-center text-sm text-white">
          We use Metamask to connect your ethereum wallet to our servers. Please
          install the{" "}
          <a
            className="text-princeton"
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
      <div className="">
        <div className="text-white text-5xl font-family: ui-sans-serif mt-10">
          Connect to Metamask
        </div>
        <div
          className={
            containerStyling +
            "w-80 h-80 cursor-pointer hover:bg-princeton mt-16 shadow-lg rounded-lg bg-linen grid place-items-center"
          }
          onClick={connect}
        >
          <img src="/Metamask.png" className={imageStyling} />
        </div>
        <div className="font-light text-white text-center text-m mt-12">
          We need your ethereum wallet's address to send your NFT!
        </div>
      </div>
    );
  }

  if (status === "initializing" || status === "connecting") {
    return (
      <div className={containerStyling + " text-center"}>
        <GridLoader size="5vh" color="#EE7B30" />
        <StatusLabel text={"Waiting on Metamask"} />
      </div>
    );
  }

  if (status === "connected" && account) {
    return (
      <div className={containerStyling + ""}>
        <StatusLabel text={`Your wallet is connected!`} complete />
        <div className="shadow-lg pt-2">
          {account && <Blockies seed={account} size={48} />}
        </div>
        <div className="text-white font-light text-sm font-family: ui-sans-serif mt-5">
          {account ? account?.substring(0, 14) + "..." : ""}
        </div>
        <div
          className="text-black text-lg font-family: ui-sans-serif rounded-lg px-4 py-2 mt-4 hover:shadow-lg bg-princeton font-light cursor-pointer"
          onClick={() => advance(account)}
        >
          Continue
        </div>
      </div>
    );
  }

  return (
    <div className={containerStyling + ""}>
      <StatusLabel text={`Something went wrong...`} />
    </div>
  );
};

export default Metamask;
