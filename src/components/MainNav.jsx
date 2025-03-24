import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";

const MainNav = () => {

  return (
    <span className="flex space-x-2 items-center">
        <UsernameMenu />
    </span>
  );
};

export default MainNav;