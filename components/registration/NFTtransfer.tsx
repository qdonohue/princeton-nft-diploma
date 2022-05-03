import Wallet from "../crypto/wallet";
import { PulseLoader } from "react-spinners";
import NFTsummary from "../crypto/NFTsummary";

import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { NftType } from "./types";

const AnimatedArrow = () => (
  <div className="flex flex-col justify-center items-center">
    <div className="rotate-90 flex flex-row justify-center items-center">
      <PulseLoader color={"#FFFFFF"} size={8} />
      <ChevronRightIcon className="w-12 h-24 -mx-4 text-white" />
    </div>
  </div>
);

const buttonStyling =
  "flex flex-row w-72 h-12 px-2 justify-between items-center text-black border border-slate-400 cursor-pointer text-center text-2xl rounded-lg font-light hover:shadow-lg bg-princeton";

const NFTtransfer = ({
  wallet,
  userData,
  imageUrl,
  mint,
  back,
}: {
  wallet: string;
  userData: NftType;
  imageUrl: string;
  mint: () => void;
  back: () => void;
}) => {
  return (
    <div className="flex flex-col justify-between items-center space-y-6">
      <NFTsummary nft={userData} img={imageUrl} />
      <AnimatedArrow />
      <div className="flex flex-row text-center justify-center items-center space-x-8">
        <div className={buttonStyling} onClick={back}>
          <ChevronLeftIcon className="h-6 w-6" />
          {"I want to change things"}
        </div>
        <Wallet address={wallet} />
        <div className={buttonStyling} onClick={mint}>
          {"Let's mint it!"}
          <ChevronRightIcon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default NFTtransfer;
