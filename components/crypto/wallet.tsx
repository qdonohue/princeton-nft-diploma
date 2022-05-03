import Blockies from "react-blockies";

const Wallet = ({ address }: { address: string }) => (
  <div className="p-2 border rounded-lg border-slate-400 flex flex-row justify-start items-center shadow-lg">
    <Blockies seed={address} size={24} />
    <div className="font-light ml-2 text-xl text-white">{address}</div>
  </div>
);

export default Wallet;
