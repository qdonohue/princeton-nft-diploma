const CAS = () => {
  const CAS_BASE_URL = "https://fed.princeton.edu/cas/";
  const SERVICE_CALLBACK_URL = "https://princeton-nft-diploma.vercel.app/";

  return (
    <div className="h-96 w-96 border border-black rounded-lg text-center">
      <a href="/api/auth/login">Connect to CAS</a>
    </div>
  );
};

export default CAS;
