import { useForm } from "react-hook-form";

export type NftType = {
  name?: string;
  image?: string | ImageData;
  description?: string;
  classYear?: Number;
};

const Label = ({ title }: { title: string }) => (
  <div className="">{title + ":"}</div>
);

const inputStyling =
  "ml-2 px-2 border rounded-lg drop-shadow-sm font-light active:border-slate-500";

const rowStyling = "flex flex-row font-light";

export const NFTPreview = ({
  name,
  image,
  description,
  classYear,
}: NftType) => {
  const { register, handleSubmit } = useForm();

  const onSubmit: any = (data: any) => {
    console.log(data);
  };

  return (
    <form
      className="w-fit border rounded-lg border-slate-500 m-2 p-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-xl">NFT preview</div>
      <div className="text-sm font-light">
        All values will be publically visible on your NFT.
      </div>
      <hr className="py-2" />
      <img className="" src="/nassau.jpeg" />
      {/* <Image /> */}
      <div className="pl-2 divide-y divide-slate-300 space-y-2">
        <div className={rowStyling}>
          <Label title={"Name"} />
          <input
            type={"text"}
            id="name"
            {...register("name")}
            className={inputStyling}
          />
        </div>
        <div className={rowStyling + " flex-col"}>
          <Label title={"Description"} />
          <textarea
            placeholder="A description for your NFT diploma"
            rows={4}
            cols={50}
            id="name"
            {...register("description")}
            className={inputStyling + " p-2 mt-2 mr-2 text-sm ml-0"}
          />
        </div>
        <div className="w-full">
          <input
            type="submit"
            value="Confirm"
            className="text-left font-light border border-slate-400 mt-2 rounded-lg p-1 shadow-sm bg-slate-300 cursor-pointer"
          />
        </div>
      </div>
    </form>
  );
};
