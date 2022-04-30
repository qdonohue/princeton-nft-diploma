import Wallet from "../crypto/wallet";
import { PulseLoader } from "react-spinners";
import NFTsummary from "../crypto/NFTsummary";

import { ChevronRightIcon } from "@heroicons/react/outline";

const dummyData = {
  name: "Quinn Donohue",
  image: "/default.jpeg",
  description: "I would like to thank jill dolan, god, and my parents",
  classYear: "????",
};

const AnimatedArrow = () => (
  <div className="-m-4 flex flex-col justify-center items-center">
    <div className="rotate-90 flex flex-row justify-center items-center">
      <PulseLoader />
      <ChevronRightIcon className="text-black w-24 h-24 -mx-4" />
    </div>
  </div>
);

const NFTtransfer = () => {
  return (
    <div className="flex flex-col justify-between items-center mt-5 space-y-8">
      <NFTsummary {...dummyData} />
      <AnimatedArrow />
      <div className="-mt-12">
        <Wallet address="asdfasdfasdfasdfasdfasdfasdfasdfasdfas" />
      </div>
    </div>
  );
};

export default NFTtransfer;
