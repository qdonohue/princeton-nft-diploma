import { useMetaMask } from "metamask-react";

import Blockies from "react-blockies";

import { GridLoader } from "react-spinners";

import Image from "next/image";

const containerStyling =
  "h-4/5 w-full mx-auto my-auto p-5 flex flex-col items-center";

const imageStyling = "h-64 w-64";

const StatusLabel = ({ text }: { text: string }) => (
  <div className="font-light text-center text-2xl">{text}</div>
);

const Metamask = ({ advance }: { advance: (arg0: string) => void }) => {
  const { status, connect, account } = useMetaMask();

  console.log(status);

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
        <div className="w-96 mt-2 text-center text-sm">
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
      <div>
        <div
          className={
            containerStyling +
            " cursor-pointer hover:bg-slate-200 mt-24 border border-slate-100 shadow-sm rounded-lg"
          }
          onClick={connect}
        >
          <div className="font-light text-center text-xl">Connect Metamask</div>
          <img src="/Metamask.png" className={imageStyling} />
          <div className="font-light text-center text-sm">
            We need your ethereum wallet to transfer your NFT
          </div>
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
        <StatusLabel text={`Succesfully connected wallet!`} />
        <div className="shadow-lg pt-2">
          {account && <Blockies seed={account} size={48} />}
        </div>
        <div className="text-sm font-light">
          {account ? account?.substring(0, 14) + "..." : ""}
        </div>
        <div
          className="border text-2xl rounded-lg px-4 py-2 mt-4 border-slate-200 hover:shadow-lg bg-princeton text-black font-light cursor-pointer"
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
