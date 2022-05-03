import Link from "next/link";

const CAS = () => {
  const CAS_BASE_URL = "https://fed.princeton.edu/cas/";
  const SERVICE_CALLBACK_URL = "https://princeton-nft-diploma.vercel.app/";

  return (
    <div className="h-14 w-40 bg-princeton rounded-lg grid place-items-center">
      <Link href="/api/auth/login">Connect to CAS</Link>
    </div>
  );
};

export default CAS;
