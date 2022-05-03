import { NftType } from "../registration/types";

const NFTsummary = ({
  name,
  message,
  year,
  img,
}: { img: string } & NftType) => {
  return (
    <div className="w-fit max-h-screen flex flex-row border border-slate-500 rounded-lg p-2 shadow-lg">
      <img src={img} className="w-48 h-48 shadow-sm" />
      <div className="flex flex-col ml-2">
        <div className="text-2xl font-bold text-center">{`${name} of the great class of ${year}`}</div>
        <hr />
        <p className="font-light">{message}</p>
      </div>
    </div>
  );
};

export default NFTsummary;
