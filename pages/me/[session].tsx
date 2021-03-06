import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import NFTsummary from "../../components/crypto/NFTsummary";
import Wallet from "../../components/crypto/wallet";
import { NftType } from "../../components/registration/types";

import { prisma } from "../../prisma/prisma";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = context.params?.session as string;

  let user = await prisma.user.findFirst({
    where: { session: { key: session } },
    include: { nft: true },
  });

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  if (!user.nft) {
    return {
      redirect: {
        permanent: false,
        destination: `/create/${session}`,
      },
    };
  }

  return {
    props: {
      nft: { ...user.nft },
      wallet: user.nft.address,
      img: user.nft.image,
    },
  };
};

const ViewNFT = ({
  nft,
  img,
  wallet,
}: {
  img?: string;
  nft?: NftType;
  wallet?: string;
}) => {
  return (
    <div className="w-screen h-screen bg-independence pt-16 px-24 mx-auto my-auto flex flex-col justify-start items-center">
      <div className="text-6xl text-center text-white">
        Your NFT has been minted!
        <div className="text-sm font-light">
          Please note that the image may take a second to appear. It has to
          propagate on IPFS first.
        </div>
      </div>
      {nft && img && <NFTsummary nft={nft} img={img} />}
      {wallet && (
        <div className="mt-24">
          <Wallet address={wallet} />
        </div>
      )}
      <div className="text-blue-400 pt-10 cursor-pointer text-xl">
        <Link href="/help">Help! How do I get my NFT into my wallet?</Link>
      </div>
    </div>
  );
};

export default ViewNFT;
