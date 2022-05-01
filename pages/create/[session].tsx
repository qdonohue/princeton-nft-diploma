import { useRouter } from "next/router";
import { useState } from "react";
import Metamask from "../../components/crypto/Metamask";
import NFTForm from "../../components/registration/NFTForm";
import NFTtransfer from "../../components/registration/NFTtransfer";
import { ProgressBar } from "../../components/registration/ProgressBar";
import { NftType } from "../../components/registration/types";

import { SIGNUP_STEP } from "../../util/constants";

const CreatePage = () => {
  const [step, setStep] = useState(SIGNUP_STEP.METAMASK);
  const [wallet, setWallet] = useState("");
  const [userData, setUserData] = useState<NftType>({});
  const [imgFile, setImgFile] = useState<File>();
  const router = useRouter();
  const { session } = router.query;

  const metamaskAdvance = (address: string) => {
    setWallet(address);
    setStep(SIGNUP_STEP.NFT);
  };

  const nftAdvance = (user: NftType, image: File | null) => {
    setUserData(user);
    if (image) {
      setImgFile(image);
    }
    setStep(SIGNUP_STEP.CONFIRM);
  };

  const mintNft = async () => {
    console.log("minting was requested!");
  };

  return (
    <div className="w-screen h-screen ">
      <div className="p-2 bg-linen mx-auto my-auto h-full pb-18 flex flex-col justify-start items-center">
        {step === SIGNUP_STEP.METAMASK && (
          <Metamask advance={metamaskAdvance} />
        )}
        {step === SIGNUP_STEP.NFT && <NFTForm advance={nftAdvance} />}
        {step === SIGNUP_STEP.CONFIRM && (
          <NFTtransfer wallet={wallet} userData={userData} mint={mintNft} />
        )}
      </div>
      <div className="fixed bottom-0 inset-x-0 white-800">
        <ProgressBar step={step} setStep={setStep} />
      </div>
    </div>
  );
};

export default CreatePage;
