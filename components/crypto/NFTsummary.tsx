import { NftType } from "../registration/types";

const label = "";
const lineContent = "col-span-2 font-light";

const RowEntry = ({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) => (
  <div className="flex flex-row space-x-2">
    <div className={"font-bold text-center"}>{label}</div>
    <div className={lineContent}>{value}</div>
  </div>
);

// const RowEntry = ({
//   label,
//   value,
// }: {
//   label: string;
//   value: string | null;
// }) => (
//   <div className="grid grid-cols-3 space-x-2">
//     <div className={"font-bold text-center col-span-1"}>{label}</div>
//     <div className={lineContent + ""}>{value}</div>
//   </div>
// );

const processValue = (value: string | undefined) => {
  return value ? value : " ";
};

const NFTsummary = ({
  name,
  major,
  message,
  year,
  img,
}: { img: string } & NftType) => {
  return (
    <div className="w-full h-full flex flex-row justify-between items-center">
      <div className="flex flex-col justify-start items-start space-y-2 border p-1 rounded-lg bg-linen w-2/5 h-full">
        <RowEntry label="Name:" value={processValue(name)} />
        <RowEntry label="Major:" value={processValue(major)} />
        <RowEntry label="Year:" value={processValue(year)} />
        <div className="flex flex-row space-x-2">
          <div className="font-bold text-center">Message:</div>
          <div className="font-light">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default NFTsummary;
