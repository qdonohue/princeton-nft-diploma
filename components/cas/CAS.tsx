import Link from "next/link";

const CAS = () => {
  const CAS_BASE_URL = "https://fed.princeton.edu/cas/";
  const SERVICE_CALLBACK_URL = "https://princeton-nft-diploma.vercel.app/";

  return (
    <div className="h-96 w-96 border border-black rounded-lg text-center">
      <Link href="/api/auth/login">Connect to CAS</Link>
    </div>
  );
};

export default CAS;
