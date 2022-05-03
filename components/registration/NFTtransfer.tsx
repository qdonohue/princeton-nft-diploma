import Wallet from "../crypto/wallet";
import { PulseLoader } from "react-spinners";
import NFTsummary from "../crypto/NFTsummary";

import { ChevronRightIcon } from "@heroicons/react/outline";
import { NftType } from "./types";

const AnimatedArrow = () => (
  <div className="-m-4 flex flex-col justify-center items-center">
    <div className="rotate-90 flex flex-row justify-center items-center">
      <PulseLoader />
      <ChevronRightIcon className="text-black w-24 h-24 -mx-4" />
    </div>
  </div>
);

const NFTtransfer = ({
  wallet,
  userData,
  imageUrl,
  mint,
}: {
  wallet: string;
  userData: NftType;
  imageUrl: string;
  mint: () => void;
}) => {
  return (
    <div className="flex flex-col justify-between items-center mt-5 space-y-8">
      <NFTsummary {...userData} img={imageUrl} />
      <AnimatedArrow />
      <div className="-mt-12">
        <Wallet address={wallet} />
      </div>
      <div
        className="border border-slate-400 cursor-pointer text-center text-2xl rounded-lg font-light hover:shadow-lg bg-princeton py-1 px-2"
        onClick={mint}
      >
        {"Let's mint it!"}
      </div>
    </div>
  );
};

export default NFTtransfer;
