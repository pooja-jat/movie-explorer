import { BiSolidCameraMovie } from "react-icons/bi";

const Logo = () => {
  return (
    <div className="w-full flex flex-row items-center">
      <BiSolidCameraMovie style={{ fontSize: "40px", marginBottom: 8 }} />
      <h1 className="px-4 text-xl font-bold">MovieMax</h1>
    </div>
  );
};

export default Logo;
