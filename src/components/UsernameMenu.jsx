import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { CircleUserRound } from "lucide-react"
import { Link } from "react-router-dom";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const UsernameMenu = () => {
    return (
    <DropdownMenu>
        <DropdownMenuContent>
            <DropdownMenuItem>
            <Link
                to="/manage-restaurant"
                className="font-bold hover:text-orange-500"
            >
                Manage Restaurant
            </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
            <Link to="/user-profile" className="font-bold hover:text-orange-500">
                User Profile
            </Link>
            </DropdownMenuItem>
            <Separator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UsernameMenu