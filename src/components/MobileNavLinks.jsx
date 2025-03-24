import { Link } from "react-router-dom";
import { Button } from "./ui/button";


const MobileNavLinks = () => {
  return (
    <>
      <Link
        to="/manage-business"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        Manage Business
      </Link>
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        User Profile
      </Link>
    </>
  );
};

export default MobileNavLinks;